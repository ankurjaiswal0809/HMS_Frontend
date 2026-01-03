import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { DoctorService } from '../../../core/services/doctor.service';
import { Doctor } from '../../../core/models/doctor.model';

@Component({
  selector: 'app-doctor-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  templateUrl: './doctor-form.component.html'
})
export class DoctorFormComponent implements OnInit {

  form!: FormGroup;        // ✅ declare only
  id?: number;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    // ✅ initialize AFTER fb injection
    this.form = this.fb.group({
      name: ['', Validators.required],
      specialization: ['', Validators.required],
      phone: ['', Validators.required],
      email: [''],
      available: [true]
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.doctorService.getById(this.id)
        .subscribe((d: Doctor) => {
          this.form.patchValue(d);
        });
    }
  }

  save(): void {
    if (this.form.invalid) return;

    const request$ = this.id
      ? this.doctorService.update(this.id, this.form.value)
      : this.doctorService.create(this.form.value);

    request$.subscribe(() => {
      this.router.navigate(['/doctors']);
    });
  }
}
