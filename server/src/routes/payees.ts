import { Router, Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

const router = Router();

// Interface for Payee data
interface Payee {
  id: string;
  name: string;
  accountNumber: string;
  keywords: string[];
  lastPayment: number;
}

// Load payees data from JSON file
const loadPayees = (): Payee[] => {
  try {
    const payeesPath = path.join(__dirname, '../data/payees.json');
    const payeesData = fs.readFileSync(payeesPath, 'utf8');
    return JSON.parse(payeesData);
  } catch (error) {
    console.error('Error loading payees data:', error);
    return [];
  }
};

// Search payees by company name
router.get('/search', (req: Request, res: Response) => {
  try {
    const { companyName } = req.query;
    
    if (!companyName || typeof companyName !== 'string') {
      return res.status(400).json({ 
        message: 'Company name is required',
        payees: []
      });
    }

    const payees = loadPayees();
    const searchTerm = companyName.toLowerCase().trim();

    // Search logic based on the instructions in the UI
    const results = payees.filter(payee => {
      const payeeName = payee.name.toLowerCase();
      const payeeKeywords = payee.keywords.map(k => k.toLowerCase());
      
      // Direct name match
      if (payeeName.includes(searchTerm)) {
        return true;
      }
      
      // Keyword match
      if (payeeKeywords.some(keyword => keyword.includes(searchTerm))) {
        return true;
      }
      
      // Handle abbreviated names (e.g., "TD" should match "TORONTO DOMINION")
      if (searchTerm.length <= 2) {
        // For short search terms, check if they appear as part of the full name
        return payeeName.includes(searchTerm);
      }
      
      // Handle comma-separated keywords
      if (searchTerm.includes(',')) {
        const keywords = searchTerm.split(',').map(k => k.trim().toLowerCase());
        return keywords.some(keyword => 
          payeeName.includes(keyword) || 
          payeeKeywords.some(k => k.includes(keyword))
        );
      }
      
      return false;
    });

    // Sort results by relevance (exact matches first, then partial matches)
    const sortedResults = results.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      
      // Exact match gets priority
      if (aName === searchTerm && bName !== searchTerm) return -1;
      if (bName === searchTerm && aName !== searchTerm) return 1;
      
      // Starts with search term gets priority
      if (aName.startsWith(searchTerm) && !bName.startsWith(searchTerm)) return -1;
      if (bName.startsWith(searchTerm) && !aName.startsWith(searchTerm)) return 1;
      
      // Alphabetical order for remaining results
      return aName.localeCompare(bName);
    });

    res.json({
      message: `Found ${sortedResults.length} payee(s)`,
      payees: sortedResults,
      searchTerm: companyName
    });

  } catch (error) {
    console.error('Error searching payees:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      payees: []
    });
  }
});

// Get all payees (for debugging/testing)
router.get('/', (req: Request, res: Response) => {
  try {
    const payees = loadPayees();
    res.json({
      message: 'All payees retrieved successfully',
      payees: payees
    });
  } catch (error) {
    console.error('Error getting all payees:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      payees: []
    });
  }
});

// Get payee by ID
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payees = loadPayees();
    const payee = payees.find(p => p.id === id);
    
    if (!payee) {
      return res.status(404).json({ 
        message: 'Payee not found'
      });
    }
    
    res.json({
      message: 'Payee found',
      payee: payee
    });
  } catch (error) {
    console.error('Error getting payee by ID:', error);
    res.status(500).json({ 
      message: 'Internal server error'
    });
  }
});

export default router; 