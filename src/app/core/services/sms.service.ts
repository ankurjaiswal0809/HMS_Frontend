import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SmsService {

  private api = `${environment.apiUrl}/notifications/sms`;

  constructor(private http: HttpClient) {}

  send(data: any): Observable<any> {
    return this.http.post(this.api, data);
  }
}
