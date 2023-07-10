import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IFeedback } from 'src/app/models/IFeedback';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-roadmap-item',
  templateUrl: './roadmap-item.component.html',
  styleUrls: ['./roadmap-item.component.scss']
})
export class RoadmapItemComponent implements OnInit {
  @Input() feedback ={} as IFeedback
  @Input() tab =''
 
  constructor(private feedbackService: FeedbackService,   private router: Router) {}
  
  ngOnInit(): void {

   
  }

  upvotedFeedback(id:number, upvoted:boolean,upvotes:number) {
    this.feedbackService.upvotedFeedback(id,upvoted,upvotes)
  }

   navigateToFeedbackDetails(id:string) {
      this.router.navigate([id]);
   }
  getCountComments() {
    let commentsCount  =0
    let totalRepliesCount = 0;
     if(this.feedback.comments?.length!=0 && this.feedback.comments?.length!=undefined) {
       commentsCount = this.feedback.comments?.length
        for (let i = 0; i < this.feedback.comments.length; i++) {
         if (this.feedback.comments[i].replies) {
           totalRepliesCount += this.feedback.comments[i].replies.length;
         }
        }
       return totalRepliesCount +  commentsCount
     }
     return 0
   }
}
