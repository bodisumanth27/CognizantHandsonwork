import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AccountService, Account } from '../../services/account.service';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="card">
      <div class="card-header">
        <h2>Customer Accounts</h2>
        <a routerLink="/create-account" class="btn btn-primary">Open New Account</a>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Account Number</th>
              <th>Holder Name</th>
              <th>Account Type</th>
              <th>Balance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let acc of accounts">
              <td>{{ acc.accountNumber }}</td>
              <td>{{ acc.accountHolderName }}</td>
              <td><span class="badge">{{ acc.accountType }}</span></td>
              <td>${{ acc.balance | number:'1.2-2' }}</td>
              <td class="action-buttons">
                <button [routerLink]="['/edit-account', acc.id]" class="btn btn-secondary">Edit</button>
                <button (click)="handleDelete(acc.id!)" class="btn btn-danger">Delete</button>
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
    .table-container {
      overflow-x: auto;
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
    .badge {
      background-color: #0284c7;
      color: #fff;
      padding: 0.25rem 0.5rem;
      border-radius: 9999px;
      font-size: 0.8rem;
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
      display: inline-block;
    }
    .btn-primary {
      background-color: #38bdf8;
      color: #0f172a;
    }
    .btn-secondary {
      background-color: #475569;
      color: #f8fafc;
    }
    .btn-danger {
      background-color: #ef4444;
      color: #fff;
    }
  `]
})
export class AccountListComponent implements OnInit {
  accounts: Account[] = [];

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.accountService.getAccounts().subscribe(data => this.accounts = data);
  }

  handleDelete(id: number) {
    if (confirm('Are you sure you want to delete this account?')) {
      this.accountService.deleteAccount(id).subscribe(() => this.loadAccounts());
    }
  }
}
