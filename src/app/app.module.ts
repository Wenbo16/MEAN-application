import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CommentContentComponent } from './comment-content/comment-content.component';
import { ViewCommentComponent } from './view-comment/view-comment.component';
import { AddCommentComponent } from './add-comment/add-comment.component';


import { CookieService } from 'ngx-cookie-service';
import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { SignupComponent } from './signup/signup.component';
import { AuthinterceptorService } from './services/authinterceptor.service';
import { EditPostComponent } from './edit-post/edit-post.component';



@NgModule({
  	declarations: [
		AppComponent,
		HomeComponent,
		LoginComponent,
		RegistrationComponent,
		CreatePostComponent,
		PostListComponent,
		PostDetailComponent,
		NavigationComponent,
		PageNotFoundComponent,
		CommentContentComponent,
		SignupComponent,
		ViewCommentComponent,
		AddCommentComponent,
		EditPostComponent
	],
  imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		RouterModule.forRoot([
		  	{ path:'home', component: HomeComponent, canActivate : [AuthGuard]},
		  	{ path:'posts', component: PostListComponent, canActivate : [AuthGuard],
		  		children:[
		  			{path:':id/edit', component: EditPostComponent}
		  		]
		  	},
		  	{ path: 'posts/:id', component: PostDetailComponent,  canActivate:[AuthGuard],
		  		children:[
				  	{ path:'comment/detail', component: ViewCommentComponent},
				  	{ path:'create', component: AddCommentComponent}
				]
		  	},
		 	{ path:'create', component: CreatePostComponent, canActivate : [AuthGuard]},
		 	{ path:'login', component: LoginComponent},
		 	{ path:'signup', component: SignupComponent},
		  	{ path:'', redirectTo:'home', pathMatch:'full'},
		  	{ path:'**', component:PageNotFoundComponent }
		])
	],
  providers: [DataService, AuthService, CookieService, AuthGuard, {
		  	provide:HTTP_INTERCEPTORS,
		 	useClass: AuthinterceptorService,
		  	multi:true
		}],
  bootstrap: [AppComponent]
})
export class AppModule { }
