import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultLoanModalComponent } from './result-loan-modal.component';

describe('ResultLoanModalComponent', () => {
  let component: ResultLoanModalComponent;
  let fixture: ComponentFixture<ResultLoanModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultLoanModalComponent]
    });
    fixture = TestBed.createComponent(ResultLoanModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
