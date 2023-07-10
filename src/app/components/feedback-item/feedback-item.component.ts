import { Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IFeedback } from 'src/app/models/IFeedback';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-feedback-item',
  templateUrl: './feedback-item.component.html',
  styleUrls: ['./feedback-item.component.scss']
})
export class FeedbackItemComponent implements OnInit {
  @Input() feedback ={} as IFeedback
  currentRoute=false
  constructor(private feedbackService: FeedbackService,  private route: ActivatedRoute, private router: Router) {}
  
  ngOnInit(): void {
    const currentRoute = this.route.snapshot.routeConfig!.path;
    if(!currentRoute) {
      this.currentRoute =false;
    }else {
      this.currentRoute =true;
    }
   
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

  upvotedFeedback(id:number, upvoted:boolean,upvotes:number) {
    this.feedbackService.upvotedFeedback(id,upvoted,upvotes)
  }

   navigateToFeedbackDetails(id:string) {
      const currentRoute = this.route.snapshot.routeConfig!.path;
      if(!currentRoute) {
        this.router.navigate([id]);
      }else {
        return 
      }
   }
}
