import { Component, Input, OnInit } from '@angular/core';
import { IComments, IFeedback } from 'src/app/models/IFeedback';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent  {
  @Input() feedback = {} as IFeedback
  lastIndex =0
  commentText =''
  notEmpty = '';
  constructor(private feedbackService: FeedbackService) {}
  

  clearError(): void {
    this.notEmpty = '';
  }
  addComment() {
    
    if (this.commentText) {
      
      if(this.feedback.comments?.length!=0 && this.feedback.comments?.length!=undefined ) {
        this.lastIndex =this.feedback.comments.length
      }else {
        this.lastIndex=0
      }
      this.notEmpty = '';
      let id= new Date().getTime()
      let data= {
          content:this.commentText,
          id: id,
          user: {
            image:"./assets/user-images/image-victoria.jpg",
            name:"Victoria Mejia",
            username:"arlen_the_marlin"
          },
          replies:[]
      }
      console.log(this.lastIndex)

      this.feedbackService.addComment(this.feedback.id, data, this.lastIndex).then(()=> {
        console.log('asds')
      }).catch(()=> {
        console.log('asdsa')
      })
    
    } else {
      this.notEmpty = 'Not Be Empty';
    }
    this.commentText = '';
  }
}
