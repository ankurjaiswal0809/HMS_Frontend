import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { PatientService } from '../../../core/services/patient.service';
import { Patient } from '../../../core/models/patient.model';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './patient-list.component.html'
})
export class PatientListComponent implements OnInit {

  patients: Patient[] = [];
  displayedColumns = ['name', 'age', 'gender', 'phone', 'actions'];

  constructor(
    private patientService: PatientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.patientService.getAll()
      .subscribe(data => this.patients = data);
  }

  addPatient(): void {
    this.router.navigate(['/patients/new']);
  }

  editPatient(id: number): void {
    this.router.navigate(['/patients/edit', id]);
  }

  deletePatient(id: number): void {
    if (!confirm('Delete this patient?')) return;

    this.patientService.delete(id)
      .subscribe(() => this.loadPatients());
  }
}
