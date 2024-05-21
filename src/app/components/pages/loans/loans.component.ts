import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RoleEnum } from 'src/app/enums/role.enum';
import { BookResponse } from 'src/app/models/book.model';
import { InputAutocompleteConfiguration } from 'src/app/models/input-autocomplete.model';
import { BalanceLoanResponse, LoanResponse, LoanStudentRequest } from 'src/app/models/loan.model';
import { StudentResponse } from 'src/app/models/student.model';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { LoanService } from 'src/app/services/loan.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit {
  createLoan: LoanStudentRequest = null;
  students: StudentResponse[] = [];
  role = RoleEnum;
  endDate = "";
  startDate = "";
  allStudents = new StudentResponse();
  configurationStudents: InputAutocompleteConfiguration = new InputAutocompleteConfiguration("fa-circle-check", true, true, null, "TODOS");
  studentSelected = null;
  loans: LoanResponse[] = [];
  todayDate = "";
  balance : BalanceLoanResponse = null;

  constructor(
    private studentService: StudentService,
    private bookService: BookService,
    private toastService: ToastrService,
    private loanService: LoanService,
    private authService: AuthService
  ) {
    this.allStudents.license = "-1";
    this.allStudents.name = "TODOS";
    this.students.push(this.allStudents);
    this.studentSelected = this.allStudents;
    var student = authService.getStudent();
    if (student) {
      this.studentSelected = student;
    }
    var today = new Date();
    this.endDate = today.toISOString().split("T")[0];
    this.todayDate = this.endDate;
    today.setDate(today.getDate() - 30);
    this.startDate = today.toISOString().split("T")[0];
  }

  ngOnInit(): void {
    this.getAllStudents();
  }

  getDateBefore(before, after) {
    const diffInMs = new Date(after).getTime() - new Date(before).getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return diffInDays;
  }

  searchStudent = (searchWord, items) => {
    searchWord = searchWord.toLowerCase();
    return items.filter((student) => {
      return student.license == searchWord || student.name.toLowerCase().includes(searchWord)
        || student.career.name.toLowerCase().includes(searchWord)
    });
  }

  search() {
    if (this.studentSelected)
      this.getAllLoansByIntervalDateAndStudent();
  }

  getAllLoansByIntervalDateAndStudent() {
    this.loanService.getAllLoansByIntervalDateAndStudent(this.studentSelected.license, this.startDate, this.endDate).subscribe({
      next: (response: LoanResponse[]) => {
        this.loans = response;
      },
      error: (error) => {
        this.toastService.error(error.error);
      }
    })
  }

  createLoanModal() {
    this.createLoan = new LoanStudentRequest();
    this.createLoan.todayDate = this.todayDate;
  }

  getAllStudents() {
    this.studentService.getAllStudents().subscribe({
      next: (response: StudentResponse[]) => {
        this.students = [this.allStudents];
        response.forEach((student) => {
          this.students.push(student);
        });
        this.getAllLoansByIntervalDateAndStudent();
      }
    })
  }

  showBalance(loan: LoanResponse){
    this.loanService.getBalanceLoan(loan.loanId, this.todayDate).subscribe({
      next:(response:BalanceLoanResponse) => {
        this.balance = response;
      },
      error: (error:HttpErrorResponse) => {
        this.toastService.error(error.error);
      }
    })
  }
}
