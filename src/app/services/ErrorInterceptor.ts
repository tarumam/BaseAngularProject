import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

// Interceptador de erros http
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // TODO: refresh token
    return next.handle(req).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          switch (err.status) {

            // Doesnt know the user
            case 401:
              localStorage.removeItem('base-project.token');
              localStorage.removeItem('base-project.user');
              this.router.navigate(['/entrar']);
              break;

            // The user does not have permission
            case 403:
              this.router.navigate(['/acesso-negado']);
              break;

            case 404:
              this.router.navigate(['/nao-encontrado']);
              break;

          }
        }
        return throwError(err);
      })
    );
  }
}
