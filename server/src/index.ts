import express, { Request, Response } from 'express';
import cors from 'cors';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- PAYEE DATA ---
interface Payee {
  id: string;
  name: string;
  accountNumber: string;
  keywords: string[];
  lastPayment: number;
  paymentDate?: string;
  nickname?: string;
  userAccountNumber?: string;
}

const loadPayees = (): Payee[] => {
  try {
    const payeesPath = path.join(__dirname, 'data', 'payees.json');
    const payeesData = fs.readFileSync(payeesPath, 'utf8');
    return JSON.parse(payeesData);
  } catch (error) {
    console.error('Error loading payees data:', error);
    return [];
  }
};

// List all payees
app.get('/api/payees', (_req: Request, res: Response) => {
  const payees = loadPayees();
  res.json({ message: 'All payees retrieved successfully', payees });
});

// Search payees by company name
app.get('/api/payees/search', (req: Request, res: Response) => {
  const { companyName } = req.query;
  if (!companyName || typeof companyName !== 'string') {
    return res.status(400).json({ message: 'Company name is required', payees: [] });
  }
  const payees = loadPayees();
  const searchTerm = companyName.toLowerCase().trim();
  const results = payees.filter(payee => {
    const payeeName = payee.name.toLowerCase();
    const payeeKeywords = payee.keywords.map(k => k.toLowerCase());
    if (payeeName.includes(searchTerm)) return true;
    if (payeeKeywords.some(keyword => keyword.includes(searchTerm))) return true;
    if (searchTerm.length <= 2) return payeeName.includes(searchTerm);
    if (searchTerm.includes(',')) {
      const keywords = searchTerm.split(',').map(k => k.trim().toLowerCase());
      return keywords.some(keyword => payeeName.includes(keyword) || payeeKeywords.some(k => k.includes(keyword)));
    }
    return false;
  });
  const sortedResults = results.sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    if (aName === searchTerm && bName !== searchTerm) return -1;
    if (bName === searchTerm && aName !== searchTerm) return 1;
    if (aName.startsWith(searchTerm) && !bName.startsWith(searchTerm)) return -1;
    if (bName.startsWith(searchTerm) && !aName.startsWith(searchTerm)) return 1;
    return aName.localeCompare(bName);
  });
  res.json({ message: `Found ${sortedResults.length} payee(s)`, payees: sortedResults, searchTerm: companyName });
});

// Get payee by ID
app.get('/api/payees/:id', (req: Request, res: Response) => {
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

// --- LOGIN & HEALTH ENDPOINTS (existing) ---
const users = [
  { 
    username: 'test', 
    password: 'test123',
    accounts: {
      chequing: { accountNumber: '1234567890', balance: 2547.75 },
      savings: { accountNumber: '1234562113', balance: 1899.25 },
      visa: { accountNumber: '1234-5678-9012-2113', balance: 1000.50 }
    },
    payees: [
      {
        id: "26",
        name: "MANITOBA HYDRO - 14 DIGIT ACCT",
        accountNumber: "HYDRO026",
        keywords: ["manitoba", "hydro", "14 digit", "utilities"],
        lastPayment: 1657.00,
        paymentDate: "2024-05-01",
        nickname: "Manitoba Hydro",
        userAccountNumber: "1234567890"
      },
      {
        id: "42",
        name: "TORONTO HYDRO ELECTRIC SYSTEM",
        accountNumber: "HYDRO042",
        keywords: ["toronto", "hydro", "electric", "utilities"],
        lastPayment: 89.50,
        paymentDate: "2024-05-01",
        nickname: "Toronto Hydro",
        userAccountNumber: "1234567890"
      },
      {
        id: "35",
        name: "OAKVILLE HYDRO",
        accountNumber: "HYDRO035",
        keywords: ["oakville", "hydro", "utilities"],
        lastPayment: 156.75,
        paymentDate: "2024-05-01",
        nickname: "Oakville Hydro",
        userAccountNumber: "1234567890"
      }
    ]
  },
  { 
    username: 'demo', 
    password: 'demo123',
    accounts: {
      chequing: { accountNumber: '9876543210', balance: 5234.80 },
      savings: { accountNumber: '9876547890', balance: 3456.90 },
      visa: { accountNumber: '9876-5432-1098-7654', balance: 2340.15 }
    },
    payees: [
      {
        id: "2",
        name: "BC HYDRO",
        accountNumber: "HYDRO002",
        keywords: ["bc", "hydro", "utilities", "electricity", "british columbia"],
        lastPayment: 234.00,
        paymentDate: "2024-05-01",
        nickname: "BC Hydro",
        userAccountNumber: "9876543210"
      },
      {
        id: "13",
        name: "GUELPH HYDRO",
        accountNumber: "HYDRO013",
        keywords: ["guelph", "hydro", "utilities"],
        lastPayment: 78.25,
        paymentDate: "2024-05-01",
        nickname: "Guelph Hydro",
        userAccountNumber: "9876543210"
      }
    ]
  }
];

interface LoginRequest {
  username: string;
  password: string;
}

app.post('/api/login', (req: Request, res: Response) => {
  const { username, password } = req.body as LoginRequest;
  const user = users.find(u => u.username === username);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  res.json({ 
    message: 'Login successful',
    user: { username: user.username, accounts: user.accounts }
  });
});

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Add a payee to a user's payee list
app.post('/api/users/:username/payees', (req: Request, res: Response) => {
  const { username } = req.params;
  const { payee, nickname, accountNumber } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  if (!user.payees) user.payees = [];
  user.payees.push({
    ...payee,
    nickname,
    accountNumber
  });
  res.json({ message: 'Payee added', payees: user.payees });
});

// Get user's payees
app.get('/api/users/:username/payees', (req: Request, res: Response) => {
  const { username } = req.params;
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  if (!user.payees) user.payees = [];
  res.json({ message: 'User payees retrieved successfully', payees: user.payees });
});

// Process a bill payment for a user and payee
app.put('/api/users/:username/payees/:payeeId/pay', (req: Request, res: Response) => {
  const { username, payeeId } = req.params;
  const { amount, accountType, paymentDate } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  if (!user.payees) user.payees = [];
  const payee = user.payees.find((p: any) => p.id === payeeId);
  if (!payee) {
    return res.status(404).json({ message: 'Payee not found' });
  }
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Invalid amount' });
  }
  if (!['Chequing', 'Savings'].includes(accountType)) {
    return res.status(400).json({ message: 'Invalid account type' });
  }
  // Subtract from the correct account
  if (accountType === 'Chequing') {
    if (user.accounts.chequing.balance < amount) {
      return res.status(400).json({ message: 'Insufficient chequing balance' });
    }
    user.accounts.chequing.balance -= amount;
  } else if (accountType === 'Savings') {
    if (user.accounts.savings.balance < amount) {
      return res.status(400).json({ message: 'Insufficient savings balance' });
    }
    user.accounts.savings.balance -= amount;
  }
  // Update payee lastPayment and paymentDate
  payee.lastPayment = amount;
  payee.paymentDate = paymentDate;
  res.json({
    message: 'Bill payment processed',
    user: { username: user.username, accounts: user.accounts },
    payees: user.payees
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
