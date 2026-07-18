import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Loan {
  id?: number;
  loanNumber: string;
  loanType: string;
  loanAmount: number;
  outstandingBalance?: number;
  accountId: number;
  status?: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private apiUrl = 'http://localhost:8080/api/loans';

  constructor(private http: HttpClient) {}

  getLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(this.apiUrl);
  }

  applyLoan(loan: Loan): Observable<Loan> {
    return this.http.post<Loan>(this.apiUrl, loan);
  }

  approveLoan(id: number): Observable<Loan> {
    return this.http.put<Loan>(`${this.apiUrl}/${id}/approve`, {});
  }

  rejectLoan(id: number): Observable<Loan> {
    return this.http.put<Loan>(`${this.apiUrl}/${id}/reject`, {});
  }
}
