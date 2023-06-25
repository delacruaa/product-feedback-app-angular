import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepliedCommentItemComponent } from './replied-comment-item.component';

describe('RepliedCommentItemComponent', () => {
  let component: RepliedCommentItemComponent;
  let fixture: ComponentFixture<RepliedCommentItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepliedCommentItemComponent]
    });
    fixture = TestBed.createComponent(RepliedCommentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
