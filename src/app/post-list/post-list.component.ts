import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { User } from '../user';
import { DataService } from '../services/data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
	selector: 'app-post-list',
	templateUrl: './post-list.component.html',
	styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit {
	posts: Post[] ;
	pageTitle : string = "Post list"; 
	selectedPosts: number[] = [];
	likesUsers: string[];
	
	constructor(private _dataService : DataService, private _cookieService : CookieService,  private _router : Router) { }

	ngOnInit() {
		this._dataService.getPosts().subscribe((data:Post[]) => {
			this.posts = data;
		});
	}

	onSelect(post: Post): void {
		let index = this.selectedPosts.indexOf(post.id)
		if( index === -1){
			this.selectedPosts.push(post.id);
			console.log(this.selectedPosts);
		}else{
			this.selectedPosts.splice(index,1);
		}
	}

	checkSelected (post: Post) : boolean{
		return this.selectedPosts.indexOf(post.id) !== -1
	}

	markFavorite(post: Post){
		var username = this._cookieService.get('username');
		// this._dataService.createPost(<Post>{});
		this._dataService.addLikes(post.id, username);

		// this._router.navigate(['/posts']);
	}

	getLikesUsers(post){
		this.likesUsers = post.likedUsers;
		console.log(this.likesUsers)
	}

	liked(post){
		var username = this._cookieService.get('username');
		return post.likedUsers.indexOf(username) == -1;
	}

	delete(id){
		this._dataService.delete(id);
	}
}
