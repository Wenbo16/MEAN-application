import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService {

	constructor(private _http : HttpClient, private _router : Router, private _cookieService : CookieService) { }
	
	checkLogin() {
		return this._cookieService.get('m_token');
	}

	fetchToken() {
		return this._cookieService.get('m_token');
	}

	signout(){
		this._cookieService.delete('m_token');
		// this._router.navigate['/home'];
	}

	authenticate(details) {
		  this._http.post('http://localhost:2000/authenticate', details)
					.subscribe((data:any) => {
						if(data.token) {
							this._cookieService.set('m_token', data.token);
							this._cookieService.set('username', data.username);
							this._router.navigate(['/posts']);
						} else {
							this._router.navigate(['/login']);
						}
		});
	}
}
