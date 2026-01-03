import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-page-header',
  imports: [CommonModule],
  templateUrl: './page-header.component.html'
})
export class PageHeaderComponent {
  @Input() title = '';
  @Input() subtitle?: string;
}
