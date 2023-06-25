import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FeedbackService } from 'src/app/services/feedback.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-feedback-page',
  templateUrl: './add-feedback-page.component.html',
  styleUrls: ['./add-feedback-page.component.scss']
})
export class AddFeedbackPageComponent implements OnInit {
    constructor(private elementRef: ElementRef, 
                private feedbackService: FeedbackService,
                private router: Router,
                private toastr: ToastrService) {}
    formGroup!:FormGroup
    public submitted = false;

    ngOnInit(): void {
      this.formGroup = new FormGroup({
        'title':new FormControl('', [Validators.required]),
        'description':new FormControl('', [Validators.required]),
      })
    }
    selects = ['Feature', 'UI', 'UX', 'Enhancement', 'Bug']
    currentSelect= 'Feature'
    isDropdownOpen=false
    currentContentChanged(newValue: string) {
      this.currentSelect = newValue;
      this.isDropdownOpen=false
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
    onKeyDown(event: any) {
      event.preventDefault(); 
    }
    submitForm() {
   
      this.submitted = true;
      if(this.formGroup.valid) {
        this.submitted=false
        let id = new Date().getTime()
        let result =''
        let data ={
          category: this.currentSelect.toLocaleLowerCase(),
          description: this.formGroup.value.description,
          id:  id,
          status: 'suggestion',
          title: this.formGroup.value.title,
          upvotes: 0,
          upvoted: false,
        }
        this.feedbackService.createFeedback(id, data).then(() => {
              this.toastr.success('success');
              this.router.navigate(['/']);
          })
          .catch(error => {
            this.toastr.error('Somtething went wrong.. try again');
          });
      }
    }
}
