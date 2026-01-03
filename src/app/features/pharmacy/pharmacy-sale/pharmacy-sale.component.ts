import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { PharmacyService } from '../../../core/services/pharmacy.service';
import { MedicineService } from '../../../core/services/medicine.service';
import { Medicine } from '../../../core/models/medicine.model';

@Component({
  selector: 'app-pharmacy-sale',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './pharmacy-sale.component.html'
})
export class PharmacySaleComponent implements OnInit {

  form!: FormGroup;          // ✅ declare only
  medicines: Medicine[] = [];

  constructor(
    private fb: FormBuilder,
    private pharmacyService: PharmacyService,
    private medicineService: MedicineService
  ) {}

  ngOnInit(): void {

    // ✅ initialize AFTER fb injection
    this.form = this.fb.group({
      medicineId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });

    this.medicineService.getAll()
      .subscribe((m: Medicine[]) => this.medicines = m);
  }

  sell(): void {
    if (this.form.invalid) return;

    // ✅ STRICT-MODE SAFE PAYLOAD
    const payload = {
      medicineId: Number(this.form.value.medicineId),
      quantity: Number(this.form.value.quantity)
    };

    this.pharmacyService.sell(payload)
      .subscribe(() => {
        alert('Medicine sold successfully');
        this.form.reset({ quantity: 1 });
      });
  }
}
