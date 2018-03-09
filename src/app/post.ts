import { User } from './user';


export class Post {
	id : number;
    title : string;
    description : string;
    author: string;
    postTime: Date;
    comments : string[];
    likedUsers: User[];
}

