import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanService } from '../../services/loan.service';
import { AccountService, Account } from '../../services/account.service';

@Component({
  selector: 'app-loan-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="form-card">
      <h2>Apply for Financial Credit</h2>
      <form [formGroup]="loanForm" (ngSubmit)="submitLoan()">
        <div class="form-group">
          <label for="accountId">Customer Linked Account</label>
          <select id="accountId" formControlName="accountId">
            <option *ngFor="let acc of accounts" [value]="acc.id">
              {{ acc.accountHolderName }} ({{ acc.accountNumber }})
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="loanNumber">Loan Contract Reference</label>
          <input id="loanNumber" formControlName="loanNumber" type="text" placeholder="LN9000X">
          <div *ngIf="loanForm.get('loanNumber')?.invalid && loanForm.get('loanNumber')?.touched" class="error-msg">
            Contract reference is required.
          </div>
        </div>

        <div class="form-group">
          <label for="loanType">Loan Category</label>
          <select id="loanType" formControlName="loanType">
            <option value="HOME">Home Mortgage</option>
            <option value="CAR">Auto/Car Loan</option>
            <option value="PERSONAL">Unsecured Personal Credit</option>
          </select>
        </div>

        <div class="form-group">
          <label for="loanAmount">Principal Amount (Min $5000)</label>
          <input id="loanAmount" formControlName="loanAmount" type="number" placeholder="5000">
          <div *ngIf="loanForm.get('loanAmount')?.invalid && loanForm.get('loanAmount')?.touched" class="error-msg">
            Principal must be at least 5000.
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" [disabled]="loanForm.invalid" class="btn btn-primary">File Application</button>
          <a routerLink="/loans" class="btn btn-secondary">Cancel</a>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-card {
      background-color: #1e293b;
      border: 1px solid #334155;
      padding: 2rem;
      border-radius: 1rem;
      max-width: 500px;
      margin: 0 auto;
    }
    .form-card h2 {
      margin-top: 0;
      margin-bottom: 1.5rem;
      font-size: 1.3rem;
    }
    .form-group {
      margin-bottom: 1.25rem;
    }
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #94a3b8;
    }
    .form-group input, .form-group select {
      width: 100%;
      padding: 0.75rem;
      background-color: #0f172a;
      border: 1px solid #334155;
      border-radius: 0.375rem;
      color: #fff;
    }
    .error-msg {
      color: #ef4444;
      font-size: 0.85rem;
      margin-top: 0.35rem;
    }
    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;
    }
    .btn {
      padding: 0.75rem 1.5rem;
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
    .btn-primary:disabled {
      background-color: #475569;
      cursor: not-allowed;
    }
    .btn-secondary {
      background-color: #334155;
      color: #f8fafc;
    }
  `]
})
export class LoanFormComponent implements OnInit {
  loanForm!: FormGroup;
  accounts: Account[] = [];

  constructor(
    private fb: FormBuilder,
    private loanService: LoanService,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loanForm = this.fb.group({
      accountId: ['', Validators.required],
      loanNumber: ['', Validators.required],
      loanType: ['HOME', Validators.required],
      loanAmount: [5000, [Validators.required, Validators.min(5000)]]
    });

    this.accountService.getAccounts().subscribe(data => {
      this.accounts = data;
      if (this.accounts.length > 0) {
        this.loanForm.patchValue({ accountId: this.accounts[0].id });
      }
    });
  }

  submitLoan() {
    if (this.loanForm.valid) {
      this.loanService.applyLoan(this.loanForm.value).subscribe(() => {
        this.router.navigate(['/loans']);
      });
    }
  }
}
