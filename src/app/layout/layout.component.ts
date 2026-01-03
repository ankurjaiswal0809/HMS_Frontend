import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ],
  template: `
    <app-header></app-header>

    <div class="container">
      <app-sidebar></app-sidebar>
      <main class="content">
        <router-outlet></router-outlet>
      </main>
    </div>

    <app-footer></app-footer>
  `,
  styles: [`
    .container {
      display: flex;
      min-height: calc(100vh - 112px);
    }
    .content {
      flex: 1;
      padding: 16px;
    }
  `]
})
export class LayoutComponent {}
