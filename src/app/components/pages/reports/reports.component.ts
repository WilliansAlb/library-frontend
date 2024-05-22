import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookResponse } from 'src/app/models/book.model';
import { InputAutocompleteConfiguration } from 'src/app/models/input-autocomplete.model';
import { LoanResponse, PaymentsByStudent, Report5, StudentListOverdue } from 'src/app/models/loan.model';
import { BalanceReportResponse, TopCareerReportResponse, TopStudentReportResponse } from 'src/app/models/report.model';
import { StudentResponse } from 'src/app/models/student.model';
import { LoanService } from 'src/app/services/loan.service';
import { ReportService } from 'src/app/services/report.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  report = "1";
  todayDate = "";
  endDate = "";
  startDate = "";
  students: StudentResponse[] = [];
  report1: LoanResponse[] = [];
  report2: LoanResponse[] = [];
  report3: BalanceReportResponse = null;
  report4: TopCareerReportResponse = null;
  report5: Report5 = null;
  report6: TopStudentReportResponse = null;
  report7: LoanResponse[] = [];
  report8: BookResponse[] = [];
  report9: BookResponse[] = [];
  report10: StudentListOverdue[] = [];
  selectedStudent: StudentResponse = null;
  configurationStudents = new InputAutocompleteConfiguration("fa-list", true, false, false, "");

  constructor(
    private loanService: LoanService,
    private reportService: ReportService,
    private toastService: ToastrService,
    private studentService: StudentService
  ) {
    this.todayDate = (new Date()).toISOString().split("T")[0];
    this.endDate = this.todayDate;
    var today = new Date();
    today.setDate(today.getDate() - 30);
    this.startDate = today.toISOString().split("T")[0];
    today.setDate(9);
    today.setMonth(9);
    today.setFullYear(2024);
    this.todayDate = today.toISOString().split("T")[0];
  }

  ngOnInit(): void {
    this.loansForToday();
    this.getAllStudents();
  }

  changeReport() {
    if (this.report == "1") {
      this.loansForToday();
    } else if (this.report == "2") {
      this.overdueLoans();
    } else if (this.report == "3") {
      this.balance();
    } else if (this.report == "4") {
      this.topCareer();
    } else if (this.report == "6") {
      this.topStudent();
    } else if (this.report == '8') {
      if (this.report8.length == 0){
        this.notAvailableCopies();
      }
    } else if (this.report == "9") {
      this.booksNeverLended();
    } else if (this.report == "10") {
      this.loansWithOverdue();
    }
  }

  loansForToday() {
    this.reportService.loansForToday(this.todayDate).subscribe({
      next: (response: LoanResponse[]) => {
        this.report1 = response;
      },
      error: (error: HttpErrorResponse) => {
        this.toastService.error(error.error);
      }
    })
  }

  overdueLoans() {
    this.reportService.overdueLoans(this.todayDate).subscribe({
      next: (response: LoanResponse[]) => {
        this.report2 = response;
      },
      error: (error: HttpErrorResponse) => {
        this.toastService.error(error.error);
      }
    })
  }

  balance() {
    this.reportService.balance(this.startDate, this.endDate).subscribe({
      next: (response: BalanceReportResponse) => {
        this.report3 = response;
      },
      error: (error: HttpErrorResponse) => {
        this.toastService.error(error.error);
      }
    })
  }

  topCareer() {
    this.reportService.topCareer(this.startDate, this.endDate).subscribe({
      next: (response: TopCareerReportResponse) => {
        this.report4 = response;
      },
      error: (error: HttpErrorResponse) => {
        this.toastService.error(error.error);
      }
    })
  }

  topStudent() {
    this.reportService.topStudent(this.startDate, this.endDate).subscribe({
      next: (response: TopStudentReportResponse) => {
        this.report6 = response;
      },
      error: (error: HttpErrorResponse) => {
        this.toastService.error(error.error);
      }
    })
  }

  notAvailableCopies(){
    this.reportService.notAvailableCopies().subscribe({
      next: (response: BookResponse[]) => {
        this.report8 = response;
      },
      error: (error: HttpErrorResponse) => {
        this.toastService.error(error.error);
      }
    })
  }

  currentlyLendedByStudent(){
    if (this.selectedStudent){
      this.reportService.currentlyLendedByStudent(this.selectedStudent.license).subscribe({
        next: (response: LoanResponse[]) => {
          this.report7 = response;
        },
        error: (error: HttpErrorResponse) => {
          this.toastService.error(error.error);
        }
      })
    }
  }

  booksNeverLended(){
    this.reportService.booksNeverLended().subscribe({
      next: (response: BookResponse[]) => {
        this.report9 = response;
      },
      error: (error: HttpErrorResponse) => {
        this.toastService.error(error.error);
      }
    })
  }

  loansByStudent(){
    if (this.selectedStudent){
      this.report5 = new Report5();
      this.reportService.loansByStudent(this.selectedStudent.license, this.startDate, this.endDate).subscribe({
        next: (response: LoanResponse[]) => {
          var totalLate = 0;
          var totalSanction = 0;
          response.forEach((loan)=>{
            var temp = new PaymentsByStudent();
            temp.loan = loan;
            var sanction = (loan.penaltyPayment?150:0);
            temp.latePayment = loan.latePayment - sanction;
            temp.sanctionPayment = sanction;
            totalLate += temp.latePayment;
            totalSanction += temp.sanctionPayment;
            this.report5.payments.push(temp);
          })
          this.report5.totalLate = totalLate;
          this.report5.totalSanction = totalSanction;
        },
        error: (error: HttpErrorResponse) => {
          this.toastService.error(error.error);
        }
      })
    }
  }

  loansWithOverdue(){
    this.reportService.loansWithOverdue(this.todayDate).subscribe({
      next: (response: LoanResponse[]) => {
        var groupByStudent: {[key:string]: StudentListOverdue} = {};
        response.forEach((loan) =>{
          loan.latePayment = this.getDateBefore(loan.expectedDate, this.todayDate) * 15 + 150;
          loan.loanPayment = this.getDateBefore(loan.loanDate, loan.expectedDate) * 5;
          if (groupByStudent[loan.student.license]){
            groupByStudent[loan.student.license].loans.push(loan);
            groupByStudent[loan.student.license].totalLate += this.getDateBefore(loan.expectedDate, this.todayDate) * 15 + 150;
            groupByStudent[loan.student.license].totalNormal += this.getDateBefore(loan.loanDate, loan.expectedDate) * 5;
          } else {
            var temp = new StudentListOverdue();
            temp.student = loan.student;
            temp.loans.push(loan);
            temp.totalLate = this.getDateBefore(loan.expectedDate, this.todayDate) * 15 + 150;
            temp.totalNormal = this.getDateBefore(loan.loanDate, loan.expectedDate) * 5;
            groupByStudent[loan.student.license] = temp;
          }
        });
        let studentsOverdue: StudentListOverdue[] = Object.values(groupByStudent);
        this.report10 = studentsOverdue;
        console.log(this.report10);
        
      },
      error: (error: HttpErrorResponse) => {
        this.toastService.error(error.error);
      }
    })
  }

  getDateBefore(before, after) {
    const diffInMs = new Date(after).getTime() - new Date(before).getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return diffInDays;
  }

  getAllStudents() {
    this.studentService.getAllStudents().subscribe({
      next: (response: StudentResponse[]) => {
        this.students = response;
      }
    })
  }

  searchStudent = (searchWord, items) => {
    searchWord = searchWord.toLowerCase();
    return items.filter((student) => {
      return student.license == searchWord || student.name.toLowerCase().includes(searchWord)
        || student.career.name.toLowerCase().includes(searchWord)
    });
  }
}
