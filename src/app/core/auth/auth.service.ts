import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private api = `${environment.apiUrl}/api/auth`;
  private roleSubject = new BehaviorSubject<string | null>(null);

  role$ = this.roleSubject.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
    this.loadRoleFromToken();
  }

  login(credentials: { username: string; password: string }) {
    return this.http.post<{ token: string }>(
      `${this.api}/login`,
      credentials
    ).pipe(
      tap(res => {
        this.tokenService.setToken(res.token);
        this.loadRoleFromToken();
      })
    );
  }

  logout(): void {
    this.tokenService.clear();
    this.roleSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.tokenService.getToken();
  }

  getUserRole(): string | null {
    return this.roleSubject.value;
  }

  private loadRoleFromToken(): void {
    const token = this.tokenService.getToken();
    if (!token) return;

    const payload = JSON.parse(atob(token.split('.')[1]));

    let role: string | null = null;
    if (payload.role) role = payload.role;
    else if (payload.roles) role = payload.roles[0];
    else if (payload.authorities)
      role = payload.authorities[0]?.replace('ROLE_', '');

    this.roleSubject.next(role);
  }
}
