import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-view-comment',
  templateUrl: './view-comment.component.html',
  styleUrls: ['./view-comment.component.css']
})
export class ViewCommentComponent implements OnInit {
	comments: any[];
  	constructor(private _dataService : DataService, private route: ActivatedRoute,
				private _router : Router) { }

  	ngOnInit() {
		this.route.parent.params.subscribe(params => {
			console.log(+params['id']);
	      	this._dataService.getComments(+params['id'])
	        	.subscribe(comments => {
	        		this.comments = comments;
	        });
	    })
	}

}
