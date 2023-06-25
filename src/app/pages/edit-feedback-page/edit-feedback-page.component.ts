import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IFeedback } from 'src/app/models/IFeedback';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-edit-feedback-page',
  templateUrl: './edit-feedback-page.component.html',
  styleUrls: ['./edit-feedback-page.component.scss']
})
export class EditFeedbackPageComponent implements OnInit {
  constructor( 
    private feedbackService: FeedbackService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute) {}

    formGroup!:FormGroup
    public submitted = false;
    feedback:IFeedback = {} as IFeedback
    selects = ['Feature', 'UI', 'UX', 'Enhancement', 'Bug']
    currentSelect= 'Feature'
    status= ['Suggestion', 'Planned', 'In-Progress', 'Live']
    currentStatus= ''
    isDropdownOpen=false
    isDropdownStatusOpen=false
    loading =false
    id=''
    ngOnInit(): void {
      this.formGroup = new FormGroup({
        'title':new FormControl('', [Validators.required]),
        'description':new FormControl('', [Validators.required]),
      })
      this.route.params.subscribe(params => {
        const id = params['id'];
  
        this.loading=true
        this.feedbackService.getFeedbackList().subscribe(data=> {
          data.forEach(item=> {
            if(item.id ==id) {
              this.feedback=item

              this.id=item.id.toString()
              this.currentSelect = item.category.length==2? item.category.toUpperCase(): item.category.charAt(0).toUpperCase() + item.category.slice(1);
              this.currentStatus  = item.status.charAt(0).toUpperCase() + item.status.slice(1)
              this.formGroup = new FormGroup({
                'title':new FormControl(item?.title, [Validators.required]),
                'description':new FormControl(item?.description, [Validators.required]),
              })
            }
          })
        })
      });
    }
    
    currentContentChanged(type:string, newValue: string) {
     if(type=='select') {
      this.currentSelect = newValue;
      this.isDropdownOpen=false
     }else if (type =='status') {
      this.currentStatus = newValue;
      this.isDropdownStatusOpen=false
     }
    }
    
    openDropdown(type:string) {
      if (type=='select') {
        this.isDropdownOpen=!this.isDropdownOpen
       }else if (type =='status') {
        this.isDropdownStatusOpen=!this.isDropdownStatusOpen
       }
    }

    deleteFeedback() {
      this.feedbackService.deleteFeedback(this.feedback.id).then(()=> {
        this.toastr.success('success');
        this.router.navigate(['/']);
      }).catch(()=> {
        this.toastr.error('Somtething went wrong.. try again');
      })
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
      this.isDropdownOpen=false
      this.isDropdownStatusOpen=false
    }
    onKeyDown(event: any) {
      event.preventDefault(); 
    }
    submitForm() {

      this.submitted = true;
      if(this.formGroup.valid) {
        this.submitted=false
        let data ={
        category: this.currentSelect.toLocaleLowerCase(),
        description: this.formGroup.value.description,
        id:  this.feedback.id,
        status: this.currentStatus.toLocaleLowerCase(),
        title: this.formGroup.value.title,
        upvotes:  this.feedback.upvotes,
        upvoted: this.feedback.upvoted,
      }
      this.feedbackService.updateFeedback(data).then(() => {
        this.toastr.success('success');
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.toastr.error('Somtething went wrong.. try again');
        });
      }
    }
}
