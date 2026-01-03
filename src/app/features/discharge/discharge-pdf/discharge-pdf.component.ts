import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { DischargeService } from '../../../core/services/discharge.service';

@Component({
  selector: 'app-discharge-pdf',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './discharge-pdf.component.html'
})
export class DischargePdfComponent {

  patientId!: number;

  constructor(
    private route: ActivatedRoute,
    private dischargeService: DischargeService
  ) {
    this.patientId = Number(this.route.snapshot.paramMap.get('id'));
  }

  downloadPdf(): void {
    this.dischargeService.downloadPdf(this.patientId)
      .subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'discharge-summary.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      });
  }
}
