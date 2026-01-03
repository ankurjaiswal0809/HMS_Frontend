import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/auth/auth.service';
import { MENU_ITEMS } from './menu.config';
import { MenuItem } from './menu.model';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menu: MenuItem[] = [];
  role = '';
  collapsed = false;

  private platformId = inject(PLATFORM_ID);

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.collapsed = localStorage.getItem('sidebar_collapsed') === 'true';
    }

    this.authService.role$.subscribe(role => {
      this.role = role ?? '';
      this.menu = MENU_ITEMS.filter(item =>
        item.roles.includes(this.role)
      );
    });
  }

  toggle(): void {
    this.collapsed = !this.collapsed;

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('sidebar_collapsed', String(this.collapsed));
    }
  }
}
