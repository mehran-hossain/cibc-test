import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Payee {
  id: string;
  name: string;
  accountNumber: string;
  keywords: string[];
  lastPayment: number;
  nickname?: string;
  userAccountNumber?: string;
}

export interface PayeeSearchResponse {
  message: string;
  payees: Payee[];
  searchTerm: string;
}

@Injectable({
  providedIn: 'root'
})
export class PayeeService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getAllPayees(): Observable<PayeeSearchResponse> {
    return this.http.get<PayeeSearchResponse>(`${this.apiUrl}/payees`);
  }

  searchPayees(companyName: string): Observable<PayeeSearchResponse> {
    return this.http.get<PayeeSearchResponse>(`${this.apiUrl}/payees/search`, {
      params: { companyName }
    });
  }

  getPayeeById(id: string) {
    return this.http.get<{ message: string; payee: Payee }>(`${this.apiUrl}/payees/${id}`);
  }

  addUserPayee(username: string, payee: Payee, nickname: string, accountNumber: string) {
    return this.http.post<{ message: string; payees: any[] }>(
      `${this.apiUrl}/users/${username}/payees`,
      { payee, nickname, accountNumber }
    );
  }

  getUserPayees(username: string): Observable<{ message: string; payees: Payee[] }> {
    return this.http.get<{ message: string; payees: Payee[] }>(`${this.apiUrl}/users/${username}/payees`);
  }
} 