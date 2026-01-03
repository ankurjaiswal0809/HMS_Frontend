import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { AppointmentService } from '../../../core/services/appointment.service';
import { DoctorService } from '../../../core/services/doctor.service';
import { PatientService } from '../../../core/services/patient.service';
import { Doctor } from '../../../core/models/doctor.model';
import { Patient } from '../../../core/models/patient.model';
import { Appointment } from '../../../core/models/appointment.model';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './appointment-form.component.html'
})
export class AppointmentFormComponent implements OnInit {

  form!: FormGroup;          // ✅ declare only
  id?: number;

  doctors: Doctor[] = [];
  patients: Patient[] = [];

  statuses = ['BOOKED', 'CANCELLED', 'COMPLETED'];

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    // ✅ initialize AFTER fb is injected
    this.form = this.fb.group({
      patientId: ['', Validators.required],
      doctorId: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      status: ['BOOKED']
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.doctorService.getAll()
      .subscribe((d: Doctor[]) => this.doctors = d);

    this.patientService.getAll()
      .subscribe((p: Patient[]) => this.patients = p);

    if (this.id) {
      this.appointmentService.getById(this.id)
        .subscribe((a: Appointment) => {
          this.form.patchValue(a);
        });
    }
  }

  save(): void {
    if (this.form.invalid) return;

    const request$ = this.id
      ? this.appointmentService.update(this.id, this.form.value)
      : this.appointmentService.create(this.form.value);

    request$.subscribe(() => {
      this.router.navigate(['/appointments']);
    });
  }
}
