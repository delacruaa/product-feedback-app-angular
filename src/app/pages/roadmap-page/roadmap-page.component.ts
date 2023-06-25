import { Component, OnInit } from '@angular/core';
import { IFeedback } from 'src/app/models/IFeedback';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-roadmap-page',
  templateUrl: './roadmap-page.component.html',
  styleUrls: ['./roadmap-page.component.scss']
})
export class RoadmapPageComponent implements OnInit {
  feedbackList:IFeedback[]=[]
  error=false
  loading=false
  tabs= [
    {
    title:'Planned',
    subtitle:"Ideas prioritized for research"
    },
    {
      title:'In-Progress',
      subtitle:"Currently being developed"
    },
    {
      title:'Live',
      subtitle:"Released features"
    },
  ]
  currentTab = 'Planned'
  constructor(private feedbackService:FeedbackService){}
    

  changeCurrentTab(tab:string) {
    this.currentTab =tab
  }
    
  ngOnInit(): void {
    this.loading=true
    this.feedbackService.getFeedbackList().subscribe((data)=> {
      this.feedbackList = data
      this.loading=false
    },(error)=> {
      this.error=true
      this.loading=false
    })
  }
}
