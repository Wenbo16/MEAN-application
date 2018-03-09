import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHeaders, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthinterceptorService implements HttpInterceptor {

	constructor(private _authService : AuthService) { }

	intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
		var authRequest = req.clone({
		 	headers:new HttpHeaders().set('authorization', this._authService.fetchToken())
		});
		return next.handle(authRequest);
	}
}