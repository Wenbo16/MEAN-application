import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})

export class EditPostComponent implements OnInit {
	post: any = {};
 	constructor(private _dataService : DataService, private route: ActivatedRoute,
				private _router : Router) { }

	ngOnInit() {
		this.getPost();
	}

	getPost() : void {
		this.route.params.subscribe(params => {
	      	this._dataService.getPost(+params['id'])
	        	.subscribe(post => {
	        		console.log(post);
	        		this.post = post;
	        });
	    })
	}

	updatePost(){
		this._dataService.updatePost(this.post);
		this._router.navigate(['/posts']);
	}

	cancel(){
		this._router.navigate(['/posts']);
	}
}
