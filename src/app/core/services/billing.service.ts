import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Bill } from '../models/bill.model';

@Injectable({ providedIn: 'root' })
export class BillingService {

  private baseUrl = `${environment.apiUrl}/billing`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.baseUrl);
  }

  generate(patientId: number): Observable<Bill> {
    return this.http.post<Bill>(`${this.baseUrl}/${patientId}`, {});
  }
}
