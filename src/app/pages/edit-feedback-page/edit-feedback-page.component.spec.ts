import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFeedbackPageComponent } from './edit-feedback-page.component';

describe('EditFeedbackPageComponent', () => {
  let component: EditFeedbackPageComponent;
  let fixture: ComponentFixture<EditFeedbackPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFeedbackPageComponent]
    });
    fixture = TestBed.createComponent(EditFeedbackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
