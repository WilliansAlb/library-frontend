import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonLoading } from 'src/app/models/loading-button.model';
import { BalanceLoanResponse } from 'src/app/models/loan.model';

@Component({
  selector: 'app-balance-modal',
  templateUrl: './balance-modal.component.html',
  styleUrls: ['./balance-modal.component.scss']
})
export class BalanceModalComponent implements OnInit {
  @Output() close = new EventEmitter<any>();
  @Input() balance = new BalanceLoanResponse();
  @Input() todayDate = "";
  daysOverdue = 0;
  daysNormal = 0;
  buttonSave = new ButtonLoading("btn-success",false,"PAY","fa fa-dollar")

  constructor() {

  }

  ngOnInit(): void {
    this.daysOverdue = this.getDateBefore(this.balance.loan.expectedDate, this.todayDate);
    this.daysOverdue = (this.daysOverdue > 0) ? this.daysOverdue : 0;
    this.daysNormal = this.getDateBefore(this.balance.loan.loanDate, this.balance.loan.expectedDate);
    this.daysNormal = (this.daysNormal > 0) ? this.daysNormal : 0;
  }

  doPayment(){
    if (this.buttonSave.loading){
      return;
    }
    this.buttonSave.loading = true;
    
  }

  getDateBefore(before, after) {
    const diffInMs = new Date(after).getTime() - new Date(before).getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return diffInDays;
  }
}
