import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Appointment } from '../models/appointment.model';

@Injectable({ providedIn: 'root' })
export class AppointmentService {

  private api = `${environment.apiUrl}/appointments`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.api);
  }

  getById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.api}/${id}`);
  }

  create(data: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.api, data);
  }

  update(id: number, data: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
