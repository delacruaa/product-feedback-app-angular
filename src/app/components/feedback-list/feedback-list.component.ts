import { Component, OnInit } from '@angular/core';
import { IComments, IFeedback } from 'src/app/models/IFeedback';
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
              return  this.countComments(b.comments)-this.countComments(a.comments)
            }else if (a.comments ){
              return  0-this.countComments(a.comments)
            }else if (b.comments ) {
              return  this.countComments(b.comments)-0 
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
              return  this.countComments(a.comments) -this.countComments(b.comments)
            }else if (b.comments ){
              return  0 -this.countComments(b.comments)
            }else if (a.comments ) {
              return  this.countComments(a.comments) -0 
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

  countComments(item:IComments[]) {
    let commentsCount  =0
    let totalRepliesCount = 0;
    if(item?.length!=0 &&  item?.length!=undefined) {
      commentsCount = item?.length
       for (let i = 0; i < item.length; i++) {
        if (item[i].replies) {
          totalRepliesCount += item[i].replies.length;
        }
       }
      return totalRepliesCount +  commentsCount
    }
    return 0
  }
}
