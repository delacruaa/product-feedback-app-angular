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
