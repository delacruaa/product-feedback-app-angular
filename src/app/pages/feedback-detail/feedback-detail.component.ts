import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFeedback } from 'src/app/models/IFeedback';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-feedback-detail',
  templateUrl: './feedback-detail.component.html',
  styleUrls: ['./feedback-detail.component.scss']
})
export class FeedbackDetailComponent implements OnInit {
  feedback:IFeedback = {} as IFeedback
  id:string=''
  constructor(private route: ActivatedRoute, private feedbackService:FeedbackService ) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.id =  params['id']
      this.feedbackService.getFeedbackList().subscribe(data=> {
        data.forEach(item=> {
          if(item.id ==id) {
            this.feedback=item
          }
        })
      })
    });
  }

}
