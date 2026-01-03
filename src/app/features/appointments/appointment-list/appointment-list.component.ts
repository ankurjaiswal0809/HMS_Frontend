import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { AppointmentService } from '../../../core/services/appointment.service';
import { Appointment } from '../../../core/models/appointment.model';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './appointment-list.component.html'
})
export class AppointmentListComponent implements OnInit {

  appointments: Appointment[] = [];
  displayedColumns = ['patientId', 'doctorId', 'appointmentTime', 'status', 'actions'];

  constructor(
    private appointmentService: AppointmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentService.getAll()
      .subscribe(data => this.appointments = data);
  }

  addAppointment(): void {
    this.router.navigate(['/appointments/new']);
  }

  editAppointment(id: number): void {
    this.router.navigate(['/appointments/edit', id]);
  }

  deleteAppointment(id: number): void {
    if (!confirm('Delete this appointment?')) return;

    this.appointmentService.delete(id)
      .subscribe(() => this.loadAppointments());
  }
}
