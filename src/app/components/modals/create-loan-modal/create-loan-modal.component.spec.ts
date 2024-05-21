import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLoanModalComponent } from './create-loan-modal.component';

describe('CreateLoanModalComponent', () => {
  let component: CreateLoanModalComponent;
  let fixture: ComponentFixture<CreateLoanModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateLoanModalComponent]
    });
    fixture = TestBed.createComponent(CreateLoanModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
