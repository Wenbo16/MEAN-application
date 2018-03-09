import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
	comment : any = {};
	constructor(private _dataService : DataService, private _router : Router, 
		private route: ActivatedRoute, private _cookieService : CookieService) { }

	ngOnInit() {
	}

	addComment(){
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		var hh = today.getHours();
		var min = today.getMinutes();
		var ss = today.getSeconds();
		var time = yyyy + '-' + mm + '-' + dd + ' ' + hh +':' + min + ':' + ss;
		this.comment.date = time;
		this.comment.username = this._cookieService.get('username');;
		this.route.parent.params.subscribe(params => {
	      	this._dataService.addNewComment(+params['id'], this.comment);
	       	this._router.navigate(['../', 'comment', 'detail'], { relativeTo: this.route });
	    })
	}

}
