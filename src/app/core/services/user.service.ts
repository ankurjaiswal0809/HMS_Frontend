import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {

  private baseUrl = `${environment.apiUrl}/api/admin/users`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  create(data: any): Observable<User> {
    return this.http.post<User>(this.baseUrl, data);
  }

  updateStatus(id: number, enabled: boolean): Observable<User> {
    return this.http.put<User>(
      `${this.baseUrl}/${id}/status`,
      null,
      { params: { enabled } }
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
