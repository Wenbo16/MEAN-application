import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { Post } from '../post';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

	// post : Post;
	post : any = {};
	constructor(private _dataService : DataService, private _router : Router, private _cookieService : CookieService) { }

	ngOnInit() {
	}

	add(){
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		var hh = today.getHours();
		var min = today.getMinutes();
		var ss = today.getSeconds();
		var time = yyyy + '-' + mm + '-' + dd + ' ' + hh +':' + min + ':' + ss;

		this.post.author = this._cookieService.get('username');
		this.post.postTime = time;
		this.post.comments = [];
		this.post.likedUsers = [];
        this._dataService.createPost(this.post);
        this._router.navigate(['/posts']);
	}

}
