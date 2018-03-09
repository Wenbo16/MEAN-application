import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

	constructor(private _authService : AuthService, private _router : Router) { }

	ngOnInit() {
		
	}

	signout(){
		this._authService.signout();
		this._router.navigate(['/home']);
	}

}
