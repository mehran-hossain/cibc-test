import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UserAccount {
  accountNumber: string;
  balance: number;
}

export interface UserAccounts {
  chequing: UserAccount;
  savings: UserAccount;
  visa: UserAccount;
}

export interface User {
  username: string;
  accounts: UserAccounts;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor() {
    // Try to load user from localStorage on service initialization
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }

  setUser(user: User): void {
    this.userSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  clearUser(): void {
    this.userSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  getTotalBalance(): number {
    const user = this.getUser();
    if (!user) return 0;
    
    return user.accounts.chequing.balance + user.accounts.savings.balance;
  }
} 