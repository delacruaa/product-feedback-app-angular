import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/compat/database';
import { IComments, IFeedback, IReplies } from '../models/IFeedback'
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  feedbackList:IFeedback[] = [] 
  constructor(private db: AngularFireDatabase) {}
  getFeedbackList() {
    return  this.db.list<IFeedback>('/').valueChanges().pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        return throwError('Something went wrong');
      })
    )
  }
  
  createFeedback(id:number,data:IFeedback) {
    return this.db.object(`${id}`).set(data)
     
  }

  upvotedFeedback(id:number, upvoted:boolean,upvotes:number) {
    return this.db.object(`${id}`).update({
      upvoted: !upvoted,
      upvotes: !upvoted ? upvotes+1: upvotes-1
    })
  }

  updateFeedback(data:IFeedback) {
    return this.db.object(`${data.id}`).update(data)
  }
  deleteFeedback(id:number) {
    return this.db.object(`/${id}`).remove()
  }
  addComment(id:number,comments:IComments,lastIndex:number) {
    return this.db.object(`${id+'/comments'+"/"+lastIndex}`).update({
        content:comments.content,
        id: comments.id,
        user: {
          image:"./assets/user-images/image-victoria.jpg",
          name:"Victoria Mejia",
          username:"arlen_the_marlin"
        },
        replies:[]
    })
  }

  addReplyComment(id:number, commentIndex:number, replyIndex:number, data:IReplies) {
    return this.db.object(`${id}/comments/${commentIndex}/replies/${replyIndex}`).update({
      content:data.content,
      replyingTo: data.replyingTo,
      user: {
        image:"./assets/user-images/image-victoria.jpg",
        name:"Victoria Mejia",
        username:"arlen_the_marlin"
      }
  })
  }
}
