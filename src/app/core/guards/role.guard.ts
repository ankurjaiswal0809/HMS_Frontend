import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { TokenService } from '../auth/token.service';

interface JwtPayload {
  sub: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectedRoles: string[] = route.data['roles'];

    const token = this.tokenService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    const decoded = jwtDecode<JwtPayload>(token);

    if (expectedRoles && expectedRoles.includes(decoded.role ?? '')) {
      return true;
    }

    this.router.navigate(['/unauthorized']);
    return false;
  }
}
