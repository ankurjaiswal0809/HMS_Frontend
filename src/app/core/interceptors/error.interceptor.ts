import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenService } from '../auth/token.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private tokenService: TokenService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        // 🔐 Unauthorized → logout
        if (error.status === 401) {
          this.tokenService.clear();
          this.router.navigate(['/login']);
        }

        // 🚫 Forbidden
        if (error.status === 403) {
          this.router.navigate(['/unauthorized']);
        }

        // 📛 Validation / business errors
        if (error.status === 400 && error.error?.fieldErrors) {
          return throwError(() => error);
        }

        // 💥 Generic error
        return throwError(() => error);
      })
    );
  }
}
