import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { DischargeService } from '../../../core/services/discharge.service';
import { PatientService } from '../../../core/services/patient.service';
import { Patient } from '../../../core/models/patient.model';

@Component({
  selector: 'app-discharge-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './discharge-form.component.html'
})
export class DischargeFormComponent implements OnInit {

  form!: FormGroup;              // ✅ declare only
  patients: Patient[] = [];

  constructor(
    private fb: FormBuilder,
    private dischargeService: DischargeService,
    private patientService: PatientService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // ✅ initialize AFTER fb injection
    this.form = this.fb.group({
      patientId: ['', Validators.required],
      diagnosis: ['', Validators.required],
      treatmentSummary: ['', Validators.required]
    });

    this.patientService.getAll()
      .subscribe((p: Patient[]) => this.patients = p);
  }

  discharge(): void {
    if (this.form.invalid) return;

    this.dischargeService.create(this.form.value)
      .subscribe(() => {
        alert('Patient discharged successfully');
        this.router.navigate([
          '/discharge/pdf',
          this.form.value.patientId
        ]);
      });
  }
}
