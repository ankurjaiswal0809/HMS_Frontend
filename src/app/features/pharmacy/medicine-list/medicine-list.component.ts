import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { MedicineService } from '../../../core/services/medicine.service';
import { Medicine } from '../../../core/models/medicine.model';

@Component({
  standalone: true,
  selector: 'app-medicine-list',
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './medicine-list.component.html'
})
export class MedicineListComponent implements OnInit {

  medicines: Medicine[] = [];
  columns = ['name', 'price', 'quantity', 'expiryDate', 'actions'];

  constructor(
    private medicineService: MedicineService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.medicineService.getAll()
      .subscribe(data => this.medicines = data);
  }

  add(): void {
    this.router.navigate(['/pharmacy/medicines/new']);
  }

  edit(id: number): void {
    this.router.navigate(['/pharmacy/medicines/edit', id]);
  }

  delete(id: number): void {
    if (!confirm('Delete medicine?')) return;
    this.medicineService.delete(id).subscribe(() => this.load());
  }

  sell(): void {
    this.router.navigate(['/pharmacy/sale']);
  }
}
