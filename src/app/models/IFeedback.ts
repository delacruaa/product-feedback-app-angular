export interface IFeedback {
	category: string;
	comments?: IComments[];
	description: string;
	id: number;
	status: string;
	title: string;
	upvotes: number;
	upvoted: boolean;
}

export interface IComments {
	content: string;
	id: number;
	user: IUser;
	replies: IReplies[];
}

export interface IReplies {
	content: string;
	replyingTo: string;
	user: IUser;
}

export interface IUser {
	image: string;
	name: string;
	username: string;
}

export interface ITab{ 
	title: string; 
	subtitle: string; 
}