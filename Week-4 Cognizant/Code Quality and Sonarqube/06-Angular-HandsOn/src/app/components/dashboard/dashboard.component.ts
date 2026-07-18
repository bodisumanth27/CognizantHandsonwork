import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService, Account } from '../../services/account.service';
import { LoanService, Loan } from '../../services/loan.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-grid">
      <div class="stat-card">
        <h3>Total Accounts</h3>
        <p class="stat-number">{{ accounts.length }}</p>
      </div>
      <div class="stat-card">
        <h3>Total Funds Seeded</h3>
        <p class="stat-number">${{ totalFunds | number:'1.2-2' }}</p>
      </div>
      <div class="stat-card">
        <h3>Total Loans Active</h3>
        <p class="stat-number">{{ loans.length }}</p>
      </div>
      <div class="stat-card">
        <h3>Total Borrowed</h3>
        <p class="stat-number">${{ totalBorrowed | number:'1.2-2' }}</p>
      </div>
    </div>

    <div class="recent-sections">
      <div class="section-card">
        <h2>Seeded Accounts Summary</h2>
        <table class="data-table">
          <thead>
            <tr>
              <th>Account No</th>
              <th>Holder Name</th>
              <th>Type</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let acc of accounts.slice(0, 5)">
              <td>{{ acc.accountNumber }}</td>
              <td>{{ acc.accountHolderName }}</td>
              <td><span class="badge">{{ acc.accountType }}</span></td>
              <td>${{ acc.balance | number:'1.2-2' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    .stat-card {
      background: linear-gradient(135deg, #1e293b, #0f172a);
      border: 1px solid #334155;
      padding: 1.5rem;
      border-radius: 1rem;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    }
    .stat-card h3 {
      margin: 0 0 0.5rem 0;
      color: #94a3b8;
      font-size: 1rem;
    }
    .stat-number {
      margin: 0;
      font-size: 2.2rem;
      font-weight: 700;
      color: #38bdf8;
    }
    .recent-sections {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    .section-card {
      background-color: #1e293b;
      border: 1px solid #334155;
      padding: 1.5rem;
      border-radius: 1rem;
    }
    .section-card h2 {
      margin: 0 0 1rem 0;
      font-size: 1.2rem;
      color: #e2e8f0;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
    }
    .data-table th, .data-table td {
      padding: 0.8rem;
      text-align: left;
      border-bottom: 1px solid #334155;
    }
    .data-table th {
      color: #94a3b8;
      font-weight: 600;
    }
    .badge {
      background-color: #38bdf8;
      color: #0f172a;
      padding: 0.2rem 0.6rem;
      border-radius: 9999px;
      font-size: 0.8rem;
      font-weight: 600;
    }
  `]
})
export class DashboardComponent implements OnInit {
  accounts: Account[] = [];
  loans: Loan[] = [];
  totalFunds = 0;
  totalBorrowed = 0;

  constructor(private accountService: AccountService, private loanService: LoanService) {}

  ngOnInit() {
    this.accountService.getAccounts().subscribe(data => {
      this.accounts = data;
      this.totalFunds = data.reduce((acc, current) => acc + current.balance, 0);
    });

    this.loanService.getLoans().subscribe(data => {
      this.loans = data;
      this.totalBorrowed = data.reduce((acc, current) => acc + current.loanAmount, 0);
    });
  }
}
