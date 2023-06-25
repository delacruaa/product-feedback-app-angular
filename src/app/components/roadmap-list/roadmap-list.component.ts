import { Component, Input, OnInit } from '@angular/core';
import { IFeedback, ITab } from 'src/app/models/IFeedback';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-roadmap-list',
  templateUrl: './roadmap-list.component.html',
  styleUrls: ['./roadmap-list.component.scss']
})
export class RoadmapListComponent implements OnInit {
  @Input() tab!: ITab
  feedbackListLocal:IFeedback[]=[]
  @Input() feedbackList:IFeedback[]=[]
  constructor(private feedbackService:FeedbackService){}
  ngOnInit(): void {
    this.feedbackService.getFeedbackList().subscribe((data)=> {
      this.feedbackListLocal =this.feedbackList.filter(item=>item.status==this.tab.title.toLocaleLowerCase())
    })
    
  }

}
