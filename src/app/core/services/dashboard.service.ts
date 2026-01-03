import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DashboardService {

  private api = `${environment.apiUrl}/dashboard`;

  constructor(private http: HttpClient) {}

  getStats(): Observable<any> {
    return this.http.get(`${this.api}/stats`);
  }

  getAppointmentsChart(): Observable<any> {
    return this.http.get(`${this.api}/appointments-chart`);
  }

  getRevenueChart(): Observable<any> {
    return this.http.get(`${this.api}/revenue-chart`);
  }

  getMonthlyAppointments() {
  return this.http.get<any>('/api/dashboard/appointments/monthly');
}

getMonthlyRevenue() {
  return this.http.get<any>('/api/dashboard/revenue/monthly');
}
}
