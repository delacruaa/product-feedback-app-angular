import { Component, OnInit } from '@angular/core';
import { IFeedback } from 'src/app/models/IFeedback';
import { FeedbackService } from 'src/app/services/feedback.service';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss']
})
export class FeedbackListComponent implements OnInit {
  feedbackList:IFeedback[]= []
  feedbackListfiltered: IFeedback[]=[]
  error=false
  loading=false
  constructor(private feedbackService: FeedbackService, private filterService: FilterService) {}

  ngOnInit() {
    this.loading=true
    this.getFeedbackList()

    this.filterService.getFilterBy().subscribe(data=> {
      this.getFeedbackList()
    })
    this.filterService.getSortBy().subscribe(data=> {
      this.getFeedbackList()
    })
  }
  

  getFeedbackList() {
    this.feedbackService.getFeedbackList().subscribe(
      (data) => {
      this.feedbackList=data.filter(item=>item.status=='suggestion')
        if(this.filterService.sortBy.value=='Most Upvotes') {
          this.feedbackListfiltered = data.filter(item=>item.status=='suggestion').sort((a, b) => b.upvotes - a.upvotes).filter((item:any)=> {
            if(this.filterService.filterBy.value=='All') {
              return item
            }else {
              return item.category ==this.filterService.filterBy.value.toLocaleLowerCase()
            }
          });  
        }
        if(this.filterService.sortBy.value=='Least Upvotes') {
          this.feedbackListfiltered = data.filter(item=>item.status=='suggestion').sort((a, b) => a.upvotes - b.upvotes).filter((item:any)=> {
            if(this.filterService.filterBy.value=='All') {
              return item
            }else {
              return item.category ==this.filterService.filterBy.value.toLocaleLowerCase()
            }
          });;
        }
        
        if(this.filterService.sortBy.value=='Most Comments') {
          this.feedbackListfiltered = data.filter(item=>item.status=='suggestion').sort((a, b) =>  {
            if(a.comments && b.comments) {
              return  b.comments.length -a.comments.length
            }else if (a.comments ){
              return  0 -a.comments.length
            }else if (b.comments ) {
              return  b.comments.length -0 
            }else {
              return  0-0 
            }
          }).filter((item:any)=> {
            if(this.filterService.filterBy.value=='All') {
              return item
            }else {
              return item.category ==this.filterService.filterBy.value.toLocaleLowerCase()
            }
          });;
        }
        if(this.filterService.sortBy.value=='Least Comments') {
          this.feedbackListfiltered = data.filter(item=>item.status=='suggestion').sort((a, b) => {
            if(b.comments && a.comments) {
              return  a.comments.length -b.comments.length
            }else if (b.comments ){
              return  0 -b.comments.length
            }else if (a.comments ) {
              return  a.comments.length -0 
            }else {
              return  0-0 
            }
          }).filter((item:any)=> {
            if(this.filterService.filterBy.value=='All') {
              return item
            }else {
              return item.category ==this.filterService.filterBy.value.toLocaleLowerCase()
            }
          });;
        }
      this.loading=false
    }, (error)=> {
      this.error=true
      this.loading=false
    });
  }
}
