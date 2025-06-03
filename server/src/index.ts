import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Enhanced user store with account balances
const users = [
  { 
    username: 'test', 
    password: 'test123',
    accounts: {
      chequing: {
        accountNumber: '1234567890',
        balance: 2547.75
      },
      savings: {
        accountNumber: '1234562113', 
        balance: 1899.25
      },
      visa: {
        accountNumber: '1234-5678-9012-2113',
        balance: 1000.50
      }
    }
  },
  { 
    username: 'demo', 
    password: 'demo123',
    accounts: {
      chequing: {
        accountNumber: '9876543210',
        balance: 5234.80
      },
      savings: {
        accountNumber: '9876547890', 
        balance: 3456.90
      },
      visa: {
        accountNumber: '9876-5432-1098-7654',
        balance: 2340.15
      }
    }
  }
];

interface LoginRequest {
  username: string;
  password: string;
}

// Login endpoint
app.post('/api/login', (req: Request, res: Response) => {
  const { username, password } = req.body as LoginRequest;

  // Find user
  console.log(username,password);
  const user = users.find(u => u.username === username);
  console.log(user);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Return user data including account balances
  res.json({ 
    message: 'Login successful',
    user: { 
      username: user.username,
      accounts: user.accounts
    }
  });
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
