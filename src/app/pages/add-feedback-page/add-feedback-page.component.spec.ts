import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeedbackPageComponent } from './add-feedback-page.component';

describe('AddFeedbackPageComponent', () => {
  let component: AddFeedbackPageComponent;
  let fixture: ComponentFixture<AddFeedbackPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFeedbackPageComponent]
    });
    fixture = TestBed.createComponent(AddFeedbackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
