import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  
  @Input() contents:string[]= []
  @Input() currentContent=''
  @Output() currentContentChanged: EventEmitter<string> = new EventEmitter();
  @Input() isDropdownOpen!:boolean
  editCurrentContent(content:string) {
    this.contents.forEach(item=> {
      if(content == item) {
        this.currentContent = content
        this.currentContentChanged.emit(content)
      }
    })
  }

 
}
