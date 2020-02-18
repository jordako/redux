import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Adds token to all requests.
 */
@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  // constructor(private currentUserService: CurrentUserService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /*
    const token: string = this.currentUserService.token;
    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }
    */

    return next.handle(request);
  }
}
