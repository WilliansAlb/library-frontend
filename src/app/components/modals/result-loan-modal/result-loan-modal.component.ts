import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoanStudentResponse } from 'src/app/models/loan.model';

@Component({
  selector: 'app-result-loan-modal',
  templateUrl: './result-loan-modal.component.html',
  styleUrls: ['./result-loan-modal.component.scss']
})
export class ResultLoanModalComponent {
  @Output() close = new EventEmitter<any>();
  @Input() response : LoanStudentResponse[] = [];
}
