import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { MedicineService } from '../../../core/services/medicine.service';
import { Medicine } from '../../../core/models/medicine.model';

@Component({
  selector: 'app-medicine-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './medicine-form.component.html'
})
export class MedicineFormComponent implements OnInit {

  form!: FormGroup;     // ✅ declare only
  id?: number;

  constructor(
    private fb: FormBuilder,
    private service: MedicineService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    // ✅ initialize AFTER fb injection
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      expiryDate: ['', Validators.required]
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.service.getById(this.id)
        .subscribe((m: Medicine) => {
          this.form.patchValue(m);
        });
    }
  }

  save(): void {
    if (this.form.invalid) return;

    // ✅ Explicit, safe cast for strict mode
    const payload: Medicine = {
      name: this.form.value.name!,
      price: this.form.value.price!,
      quantity: this.form.value.quantity!,
      expiryDate: this.form.value.expiryDate!
    };

    const request$ = this.id
      ? this.service.update(this.id, payload)
      : this.service.create(payload);

    request$.subscribe(() => {
      this.router.navigate(['/pharmacy']);
    });
  }
}
