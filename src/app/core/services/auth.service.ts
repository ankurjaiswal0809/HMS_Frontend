import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = `${environment.apiUrl}/api/auth`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // 🔹 LOGIN
  login(data: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, data).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
      })
    );
  }

  // 🔹 LOGOUT
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  // 🔹 TOKEN
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // 🔹 ROLE
  getRole(): string {
    return localStorage.getItem('role') || '';
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  isDoctor(): boolean {
    return this.getRole() === 'DOCTOR';
  }

  isStaff(): boolean {
    return this.getRole() === 'STAFF';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
