import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit  {
  constructor(private elementRef: ElementRef, private filterService: FilterService,private feedbackService:FeedbackService) {}
  contents =['Most Upvotes', 'Least Upvotes','Most Comments', 'Least Comments']
  currentContent=''
  isDropdownOpen=false
  suggestionCount=0
  @Input() route ='/'
  currentContentChanged(newValue: string) {
   
    this.filterService.sortBy.next(newValue)
    
  }

  ngOnInit(): void {
   
    this.getSuggestionCount()
    this.filterService.getSortBy().subscribe(data=> {
      this.currentContent = data;
    })
    this.filterService.getFilterBy().subscribe(data=> {
      this.getSuggestionCount()
    })
  }

  getSuggestionCount() {
    this.feedbackService.getFeedbackList().subscribe(data=> {
      this.suggestionCount = data.filter(item=>item.status=='suggestion').sort((a, b) => b.upvotes - a.upvotes).filter((item:any)=> {
        if(this.filterService.filterBy.value=='All') {
          return item
        }else {
          return item.category ==this.filterService.filterBy.value.toLocaleLowerCase()
        }
      }).length
    })
  }
  openDropdown() {
   
    this.isDropdownOpen=!this.isDropdownOpen
  }
 
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
    
      this.isDropdownOpen=false
    }
  }
}
