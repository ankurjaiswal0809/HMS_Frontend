import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DischargeService {

  private api = `${environment.apiUrl}/discharge`;

  constructor(private http: HttpClient) {}

  create(data: {
    patientId: number;
    diagnosis: string;
    treatmentSummary: string;
  }): Observable<any> {
    return this.http.post(this.api, data);
  }

  downloadPdf(patientId: number): Observable<Blob> {
    return this.http.get(`${this.api}/pdf/${patientId}`, {
      responseType: 'blob'
    });
  }
}
