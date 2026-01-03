import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Medicine } from '../models/medicine.model';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  private baseUrl = `${environment.apiUrl}/medicines`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(this.baseUrl);
  }

  getById(id: number): Observable<Medicine> {
    return this.http.get<Medicine>(`${this.baseUrl}/${id}`);
  }

  create(data: Medicine): Observable<Medicine> {
    return this.http.post<Medicine>(this.baseUrl, data);
  }

  update(id: number, data: Medicine): Observable<Medicine> {
    return this.http.put<Medicine>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
