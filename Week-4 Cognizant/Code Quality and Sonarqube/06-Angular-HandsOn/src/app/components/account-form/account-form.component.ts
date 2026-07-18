import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="form-card">
      <h2>{{ isEditMode ? 'Modify Account Details' : 'Open Savings/Current Account' }}</h2>
      <form [formGroup]="accountForm" (ngSubmit)="saveAccount()">
        <div class="form-group">
          <label for="accountNumber">Account Number</label>
          <input id="accountNumber" formControlName="accountNumber" type="text" placeholder="ACC1000X">
          <div *ngIf="accountForm.get('accountNumber')?.invalid && accountForm.get('accountNumber')?.touched" class="error-msg">
            Account number is required (min 5 characters).
          </div>
        </div>

        <div class="form-group">
          <label for="accountHolderName">Holder Full Name</label>
          <input id="accountHolderName" formControlName="accountHolderName" type="text" placeholder="John Doe">
          <div *ngIf="accountForm.get('accountHolderName')?.invalid && accountForm.get('accountHolderName')?.touched" class="error-msg">
            Name is required (min 2 characters).
          </div>
        </div>

        <div class="form-group">
          <label for="accountType">Account Category</label>
          <select id="accountType" formControlName="accountType">
            <option value="SAVINGS">Savings</option>
            <option value="CURRENT">Current</option>
          </select>
        </div>

        <div class="form-group" *ngIf="!isEditMode">
          <label for="balance">Opening Deposit (Minimum $1000)</label>
          <input id="balance" formControlName="balance" type="number" placeholder="1000">
          <div *ngIf="accountForm.get('balance')?.invalid && accountForm.get('balance')?.touched" class="error-msg">
            Initial deposit must be at least 1000.
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" [disabled]="accountForm.invalid" class="btn btn-primary">Save Account</button>
          <a routerLink="/accounts" class="btn btn-secondary">Cancel</a>
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
export class AccountFormComponent implements OnInit {
  accountForm!: FormGroup;
  isEditMode = false;
  accountId?: number;

  constructor(
    private fb: FormBuilder,
    private service: AccountService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.accountId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.accountId;

    this.accountForm = this.fb.group({
      accountNumber: ['', [Validators.required, Validators.minLength(5)]],
      accountHolderName: ['', [Validators.required, Validators.minLength(2)]],
      accountType: ['SAVINGS', Validators.required],
      balance: [1000, [Validators.required, Validators.min(1000)]]
    });

    if (this.isEditMode) {
      this.accountForm.get('balance')?.disable();
      this.service.getAccount(this.accountId!).subscribe(acc => {
        this.accountForm.patchValue(acc);
      });
    }
  }

  saveAccount() {
    const accountData = this.accountForm.getRawValue();
    if (this.isEditMode) {
      this.service.updateAccount(this.accountId!, accountData).subscribe(() => {
        this.router.navigate(['/accounts']);
      });
    } else {
      this.service.createAccount(accountData).subscribe(() => {
        this.router.navigate(['/accounts']);
      });
    }
  }
}
