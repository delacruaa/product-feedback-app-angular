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
}
