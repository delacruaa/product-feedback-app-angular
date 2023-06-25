import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  filters=['All', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature']
  currentFilter = ''
  plannedCount=0
  inProgressCount =0
  liveCount=0
  constructor(private filterService: FilterService, private feedbackService:FeedbackService) {}
  editCurrentFilter(filter:string)  {
    this.filters.forEach(item=> {
     if(filter==item) {
  
      this.filterService.filterBy.next(filter)
     }
    })
  }
  ngOnInit(): void {
    this.filterService.getFilterBy().subscribe(data=> {
      this.currentFilter=data
    })
    this.feedbackService.getFeedbackList().subscribe(data=> {
      this.plannedCount = data.filter(item=>item.status=='planned').length
      this.inProgressCount = data.filter(item=>item.status=='in-progress').length
      this.liveCount = data.filter(item=>item.status=='live').length
    })
  }
}
