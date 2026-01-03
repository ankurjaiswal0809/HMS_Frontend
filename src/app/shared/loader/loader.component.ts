import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../core/services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {

  isLoading = false;

  constructor(private loaderService: LoaderService) {
     console.log('✅ Loader component initialized');
    this.loaderService.loading$.subscribe(status => {
      console.log('🔄 Loader status:', status);
      this.isLoading = status;
    });
  }
}
