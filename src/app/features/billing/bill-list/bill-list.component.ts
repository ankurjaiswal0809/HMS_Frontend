import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { BillingService } from '../../../core/services/billing.service';
import { Bill } from '../../../core/models/bill.model';

@Component({
  selector: 'app-bill-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './bill-list.component.html'
})
export class BillListComponent implements OnInit {

  bills: Bill[] = [];
  displayedColumns = ['id', 'patientId', 'amount', 'billDate', 'description'];

  constructor(private billingService: BillingService) {}

  ngOnInit(): void {
    this.loadBills();
  }

  loadBills(): void {
    this.billingService.getAll()
      .subscribe(data => this.bills = data);
  }
}
