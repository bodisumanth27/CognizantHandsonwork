import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="app-container">
      <aside class="sidebar">
        <div class="logo">
          <h2>ApexBank</h2>
        </div>
        <nav class="nav-links">
          <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">Dashboard</a>
          <a routerLink="/accounts" routerLinkActive="active" class="nav-item">Accounts</a>
          <a routerLink="/create-account" routerLinkActive="active" class="nav-item">Create Account</a>
          <a routerLink="/loans" routerLinkActive="active" class="nav-item">Loans Management</a>
          <a routerLink="/apply-loan" routerLinkActive="active" class="nav-item">Apply for Loan</a>
        </nav>
      </aside>
      <main class="content-area">
        <header class="top-header">
          <h1>Customer Portal</h1>
          <div class="user-profile">
            <span>Welcome, Manager</span>
          </div>
        </header>
        <div class="router-outlet-container">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      min-height: 100vh;
      background-color: #0f172a;
      color: #f8fafc;
    }
    .sidebar {
      width: 260px;
      background-color: #1e293b;
      padding: 2rem;
      border-right: 1px solid #334155;
    }
    .logo h2 {
      margin: 0 0 2rem 0;
      color: #38bdf8;
      font-size: 1.8rem;
      font-weight: 700;
    }
    .nav-links {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .nav-item {
      color: #94a3b8;
      text-decoration: none;
      padding: 0.8rem 1rem;
      border-radius: 0.5rem;
      transition: all 0.3s ease;
      font-weight: 500;
    }
    .nav-item:hover, .nav-item.active {
      color: #f8fafc;
      background-color: #334155;
      transform: translateX(4px);
    }
    .nav-item.active {
      border-left: 4px solid #38bdf8;
    }
    .content-area {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .top-header {
      background-color: #1e293b;
      padding: 1.5rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #334155;
    }
    .top-header h1 {
      margin: 0;
      font-size: 1.5rem;
    }
    .user-profile span {
      background-color: #334155;
      padding: 0.5rem 1rem;
      border-radius: 9999px;
      font-size: 0.9rem;
      color: #38bdf8;
    }
    .router-outlet-container {
      padding: 2rem;
      flex: 1;
      overflow-y: auto;
    }
  `]
})
export class AppComponent {}
