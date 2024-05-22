import { Component, OnInit } from '@angular/core';
import { StudentResponse } from 'src/app/models/student.model';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { LoanService } from 'src/app/services/loan.service';
import { StudentService } from 'src/app/services/student.service';
import { ToastrService } from 'ngx-toastr';
import { RoleEnum } from 'src/app/enums/role.enum';
import { InputAutocompleteConfiguration } from 'src/app/models/input-autocomplete.model';
import { BookingService } from 'src/app/services/booking.service';
import { BookingResponse } from 'src/app/models/booking.model';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  students: StudentResponse[] = [];
  allStudents = new StudentResponse();
  studentSelected: StudentResponse = null;
  role = RoleEnum;
  endDate = "";
  startDate = "";
  todayDate = "";
  configurationStudents: InputAutocompleteConfiguration = new InputAutocompleteConfiguration("fa-circle-check", true, true, null, "TODOS");
  bookingList : BookingResponse[] = [];

  constructor(
    private studentService: StudentService,
    private bookService: BookService,
    private toastService: ToastrService,
    private loanService: LoanService,
    private bookingService: BookingService,
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

  searchStudent = (searchWord, items) => {
    searchWord = searchWord.toLowerCase();
    return items.filter((student) => {
      if (student.license == "-1"){
        return student.license == searchWord;
      } else {
        return student.license == searchWord || student.name.toLowerCase().includes(searchWord)
          || student.career.name.toLowerCase().includes(searchWord)
      }
    });
  }

  search() {
    if (this.studentSelected)
      this.findBookingsByStudentAndIntervalDate();
  }

  getAllStudents() {
    this.studentService.getAllStudents().subscribe({
      next: (response: StudentResponse[]) => {
        this.students = [this.allStudents];
        response.forEach((student) => {
          this.students.push(student);
        });
        this.findBookingsByStudentAndIntervalDate();
      }
    })
  }

  findBookingsByStudentAndIntervalDate() {
    this.bookingService.findBookingsByStudentAndIntervalDate(
      this.studentSelected.license,
      this.startDate,
      this.endDate,
      this.todayDate).subscribe({
        next: (response: BookingResponse[]) => {
          this.bookingList = response;
        },
        error: (error) => {
          this.toastService.error(error.error);
        }
      })
  }
}
