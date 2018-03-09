import { Injectable } from '@angular/core';
import { Post } from '../post';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs/Rx';
import { Http, Response, Headers } from '@angular/http';
import { AuthService } from '../services/auth.service';


@Injectable()
export class DataService {

	private _PostsSubject = new Subject<Post[]>();
	private _commentsSubject = new Subject<any[]>();

	constructor(private _http : HttpClient, private _authService : AuthService) { }

	getPosts(): Subject<Post[]> {
		// console.log('getPosts called');
		this._http.get('http://localhost:2000/posts')
			.subscribe((res: Post[]) => {
				this._PostsSubject.next(res);
			})
		return this._PostsSubject;
	}
	
	// have to res.send(posts);
	createPost(newPost: Post) {
		this._http.post('http://localhost:2000/addpost', newPost)
			.subscribe(() => {
				this.getPosts();
			})
	}

	 //不 subscribe就不会发送post request, try behavior subject
    addLikes(postId : number, username : string){
    	this._http.post(`http://localhost:2000/addlikes`, {'postId':postId, 'username':username})
		    .subscribe(()=>{
		   		this.getPosts();
			})
    }

	getPost(id: number): Observable<Post> {
        return this._http.get<Post>(`http://localhost:2000/posts/${id}`);
    }

    // todo: split services
    getComments(id : number){
		this.getPost(id)
        	.subscribe(post => {
        		this._commentsSubject.next(post.comments);
        });
        return this._commentsSubject;
    }

    addNewComment(id : number, content : string){
    	console.log(content);
    	return  this._http.post(`http://localhost:2000/addcomments/${id}`, {'content':content})
    				.subscribe(()=>{
    					this.getComments(id);
    				})
    }

    delete(id:number){
    	return  this._http.post(`http://localhost:2000/delete/${id}`, {'id':id})
    				.subscribe(()=>{
    					this.getPosts();
    				})
    }

    updatePost(post){
    	this._http.post('http://localhost:2000/editPost', post)
			.subscribe(() => {
				this.getPosts();
			})
    }
}	
