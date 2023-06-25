import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackItemComponent } from './feedback-item.component';

describe('FeedbackItemComponent', () => {
  let component: FeedbackItemComponent;
  let fixture: ComponentFixture<FeedbackItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackItemComponent]
    });
    fixture = TestBed.createComponent(FeedbackItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
