import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CareerResponse } from 'src/app/models/career.model';
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
  careersIds: {[key: number]: CareerResponse} = {};
  students: StudentResponse[] = [];

  constructor(
    private careerService: CareerService,
    private toastService: ToastrService,
    private studentService: StudentService
  ){

  }

  ngOnInit(): void {
      this.getAllCareers();
      this.getAllStudents();
  }

  getAllCareers(){
    this.careerService.getAllCareers().subscribe({
      next: (response: CareerResponse[]) => {
        this.careers = response;
        this.careers.forEach((career)=>{
          this.careersIds[career.careerId] = career;
        });
      },
      error: (error:HttpErrorResponse) => {
        this.toastService.error(error.error);
      }
    })
  }

  getAllStudents(){
    this.studentService.getAllStudents().subscribe({
      next: (response:StudentResponse[]) => {
        this.students = response;
      },
      error: (error:HttpErrorResponse) => {
        this.toastService.error(error.error);
      }
    })
  }

  search(){
    
  }

}
