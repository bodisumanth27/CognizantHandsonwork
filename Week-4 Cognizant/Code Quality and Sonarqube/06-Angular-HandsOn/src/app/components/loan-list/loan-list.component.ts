import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoanService, Loan } from '../../services/loan.service';

@Component({
  selector: 'app-loan-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="card">
      <div class="card-header">
        <h2>Active Loans Directory</h2>
        <a routerLink="/apply-loan" class="btn btn-primary">New Loan Application</a>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Loan Reference</th>
              <th>Applicant Account ID</th>
              <th>Loan Category</th>
              <th>Borrowed Sum</th>
              <th>Outstanding Bal</th>
              <th>Review Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let loan of loans">
              <td>{{ loan.loanNumber }}</td>
              <td>Acc ID: {{ loan.accountId }}</td>
              <td>{{ loan.loanType }}</td>
              <td>${{ loan.loanAmount | number:'1.2-2' }}</td>
              <td>${{ loan.outstandingBalance | number:'1.2-2' }}</td>
              <td>
                <span class="status-badge" [ngClass]="loan.status?.toLowerCase()">
                  {{ loan.status }}
                </span>
              </td>
              <td class="action-buttons">
                <button *ngIf="loan.status === 'PENDING'" (click)="approve(loan.id!)" class="btn btn-success">Approve</button>
                <button *ngIf="loan.status === 'PENDING'" (click)="reject(loan.id!)" class="btn btn-danger">Reject</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .card {
      background-color: #1e293b;
      border: 1px solid #334155;
      border-radius: 1rem;
      padding: 1.5rem;
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    .card-header h2 {
      margin: 0;
      font-size: 1.3rem;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
    }
    .data-table th, .data-table td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #334155;
    }
    .data-table th {
      color: #94a3b8;
    }
    .status-badge {
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.8rem;
      font-weight: 600;
    }
    .status-badge.pending {
      background-color: #f59e0b;
      color: #0f172a;
    }
    .status-badge.approved {
      background-color: #10b981;
      color: #fff;
    }
    .status-badge.rejected {
      background-color: #ef4444;
      color: #fff;
    }
    .action-buttons {
      display: flex;
      gap: 0.5rem;
    }
    .btn {
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      border: none;
      cursor: pointer;
      font-weight: 500;
      text-decoration: none;
    }
    .btn-primary {
      background-color: #38bdf8;
      color: #0f172a;
    }
    .btn-success {
      background-color: #10b981;
      color: #fff;
    }
    .btn-danger {
      background-color: #ef4444;
      color: #fff;
    }
  `]
})
export class LoanListComponent implements OnInit {
  loans: Loan[] = [];

  constructor(private loanService: LoanService) {}

  ngOnInit() {
    this.loadLoans();
  }

  loadLoans() {
    this.loanService.getLoans().subscribe(data => this.loans = data);
  }

  approve(id: number) {
    this.loanService.approveLoan(id).subscribe(() => this.loadLoans());
  }

  reject(id: number) {
    this.loanService.rejectLoan(id).subscribe(() => this.loadLoans());
  }
}
