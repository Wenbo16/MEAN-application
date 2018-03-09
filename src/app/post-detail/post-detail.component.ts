import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})


export class PostDetailComponent implements OnInit {
	// You don't have posts initially. 
	// This object is loaded asynchronously. So, it is undefined when Angular renders the component markup.
	post: Post;
	// post: Post = <Post>{};
	// post: any = {};
	constructor(private _dataService : DataService, private route: ActivatedRoute,
				private _router : Router) { }

	ngOnInit() {
		this.getPost();
	}

	getPost() : void {
		this.route.params.subscribe(params => {
	      	this._dataService.getPost(+params['id'])
	        	.subscribe(post => {
	        		this.post = post;
	        });
	    })
	}

	goBack(){
		this._router.navigate(['/posts']);
	}
}
