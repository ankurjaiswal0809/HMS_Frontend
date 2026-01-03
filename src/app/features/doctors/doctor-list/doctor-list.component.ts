import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { DoctorService } from '../../../core/services/doctor.service';
import { Doctor } from '../../../core/models/doctor.model';

@Component({
  standalone: true,
  selector: 'app-doctor-list',
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './doctor-list.component.html'
})
export class DoctorListComponent implements OnInit {

  doctors: Doctor[] = [];
  columns = ['name', 'specialization', 'phone', 'actions'];

  constructor(private service: DoctorService, private router: Router) {}

  ngOnInit() {
    this.service.getAll().subscribe(d => this.doctors = d);
  }

  add() {
    this.router.navigate(['/doctors/new']);
  }

  edit(id: number) {
    this.router.navigate(['/doctors/edit', id]);
  }

  delete(id: number) {
    if (confirm('Delete doctor?')) {
      this.service.delete(id).subscribe(() => this.ngOnInit());
    }
  }
}
