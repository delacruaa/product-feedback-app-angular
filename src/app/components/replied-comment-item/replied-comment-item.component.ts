import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IComments, IFeedback, IReplies } from 'src/app/models/IFeedback';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-replied-comment-item',
  templateUrl: './replied-comment-item.component.html',
  styleUrls: ['./replied-comment-item.component.scss']
})
export class RepliedCommentItemComponent implements OnInit {
  @Input() comment = {} as IReplies
  @Input() parentComment ={} as IComments
  isShowReply =false
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
      if(this.parentComment.replies?.length) {
        this.replyIndex = this.parentComment.replies?.length

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
