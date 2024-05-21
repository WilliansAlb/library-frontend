import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CareerResponse } from 'src/app/models/career.model';
import { ButtonLoading } from 'src/app/models/loading-button.model';
import { StudentResponse } from 'src/app/models/student.model';
import { CareerService } from 'src/app/services/career.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  searchWord = "";
  careers: CareerResponse[] = [];
  careersIds: { [key: number]: CareerResponse } = {};
  students: StudentResponse[] = [];
  newStudent: StudentResponse = null;
  buttonSave = new ButtonLoading("btn-success", false, "", "fa-save");
  buttonQuite = new ButtonLoading("btn-danger", false, "", "fa-xmark");
  studentQr = null;
  careerId = "0";
  timeout = null;

  constructor(
    private careerService: CareerService,
    private toastService: ToastrService,
    private studentService: StudentService
  ) {

  }

  showCreate() {
    this.newStudent = new StudentResponse();
  }

  saveStudent() {
    if (this.buttonSave.loading) {
      return;
    }
    this.buttonSave.loading = true;
    var request = Object.assign({}, this.newStudent);
    request.license = request.license + "";
    request.career.careerId = parseInt(request.career.careerId + "");
    request.career.name = "";
    request.userLibrary = null;
    this.studentService.createStudent(request).subscribe({
      next: (response: StudentResponse) => {
        this.toastService.success("Student created successfully!");
        this.buttonSave.loading = false;
        this.getAllStudents();
        this.newStudent = null;
      },
      error: (error: HttpErrorResponse) => {
        this.buttonSave.loading = false;
        this.toastService.error(error.error);
      }
    });
  }

  ngOnInit(): void {
    this.getAllCareers();
    this.getAllStudents();
  }

  getAllCareers() {
    this.careerService.getAllCareers().subscribe({
      next: (response: CareerResponse[]) => {
        this.careers = response;
        this.careers.forEach((career) => {
          this.careersIds[career.careerId] = career;
        });
      },
      error: (error: HttpErrorResponse) => {
        this.toastService.error(error.error);
      }
    })
  }

  getAllStudents() {
    this.studentService.getAllStudents().subscribe({
      next: (response: StudentResponse[]) => {
        this.students = response;
      },
      error: (error: HttpErrorResponse) => {
        this.toastService.error(error.error);
      }
    })
  }

  search() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.studentService.searchStudent(this.searchWord, this.careerId).subscribe({
        next: (response: StudentResponse[]) => {
          this.students = response;
        },
        error: (error: HttpErrorResponse) => {
          this.toastService.error(error.error);
        }
      })
    }, 500);
  }

}
