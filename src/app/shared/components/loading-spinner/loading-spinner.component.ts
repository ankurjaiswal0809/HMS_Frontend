import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  selector: 'app-loading-spinner',
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './loading-spinner.component.html'
})
export class LoadingSpinnerComponent {}
