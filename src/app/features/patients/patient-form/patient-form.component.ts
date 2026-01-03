import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { PatientService } from '../../../core/services/patient.service';
import { Patient } from '../../../core/models/patient.model';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './patient-form.component.html'
})
export class PatientFormComponent implements OnInit {

  form!: FormGroup;      // ✅ declare only
  id?: number;
   genders = ['MALE', 'FEMALE', 'OTHER'];

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    // ✅ initialize AFTER fb injection
    this.form = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['']
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.patientService.getById(this.id)
        .subscribe((p: Patient) => {
          this.form.patchValue(p);
        });
    }
  }

  save(): void {
    if (this.form.invalid) return;

    const request$ = this.id
      ? this.patientService.update(this.id, this.form.value)
      : this.patientService.create(this.form.value);

    request$.subscribe(() => {
      this.router.navigate(['/patients']);
    });
  }
}
