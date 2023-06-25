import { Component, Input, OnInit } from '@angular/core';
import { IFeedback } from 'src/app/models/IFeedback';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent {
  @Input() feedback ={} as IFeedback
}
