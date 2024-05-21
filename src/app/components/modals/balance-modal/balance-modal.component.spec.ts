import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceModalComponent } from './balance-modal.component';

describe('BalanceModalComponent', () => {
  let component: BalanceModalComponent;
  let fixture: ComponentFixture<BalanceModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BalanceModalComponent]
    });
    fixture = TestBed.createComponent(BalanceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
