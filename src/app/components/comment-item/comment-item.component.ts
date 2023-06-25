import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IComments, IFeedback } from 'src/app/models/IFeedback';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent {
  isShowReply =false
  @Input() comment = {} as IComments
  @Input() commentIndex =0  
  commentText =''
  replyIndex =0
  notEmpty = '';
  feedback = {} as IFeedback
  constructor(private feedbackService: FeedbackService, private route:ActivatedRoute) {}
  
  ngOnInit(): void {
    let id =0;
    this.commentText ='@'+ this.comment.user.username
    this.route.params.subscribe(param=> {
      id = param['id']
      this.feedbackService.getFeedbackList().subscribe(data=> {
        data.forEach(item=> {
          if(item.id == id) {
            this.feedback = item
          }
        })
      })
    })
    
  }

  clearError(): void {
    this.notEmpty = '';
  }
 
  showReplay() {
    this.isShowReply=!this.isShowReply
  }

  addRepliesComment() {
    
    if (this.commentText) {
      if(this.comment.replies?.length) {
        this.replyIndex = this.comment.replies?.length

      }else {
        this.replyIndex =0
      }
      
      this.notEmpty = '';
     
      let data= {
          content:this.commentText,
          replyingTo:this.comment.user.username,
          user: {
            image:"./assets/user-images/image-victoria.jpg",
            name:"Victoria Mejia",
            username:"arlen_the_marlin"
          },
      }
      console.log(this.replyIndex)

      this.feedbackService.addReplyComment(this.feedback.id, this.commentIndex, this.replyIndex,data).then(()=> {
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
