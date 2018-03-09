import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
	// userInfo : User;
	userInfo : any = {};
	constructor() { }

	ngOnInit() {
	}
	
	signup(){
		console.log(this.userInfo);
	}
}
