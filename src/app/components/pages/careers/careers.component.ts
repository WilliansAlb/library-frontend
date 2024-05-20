import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RoleEnum } from 'src/app/enums/role.enum';
import { CareerResponse } from 'src/app/models/career.model';
import { ButtonLoading } from 'src/app/models/loading-button.model';
import { CareerService } from 'src/app/services/career.service';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss']
})
export class CareersComponent implements OnInit {
  searchWord = "";
  careers: CareerResponse[] = [];
  timeout = null;
  newCareer: CareerResponse = null;
  careerId = null;
  role = RoleEnum;
  buttonSave = new ButtonLoading("btn-success", false, "", "fa-save");
  buttonQuite = new ButtonLoading("btn-danger", false, "", "fa-xmark");
  buttonEdit = new ButtonLoading("btn-success", false, "", "fa-save");
  buttonQuiteEdit = new ButtonLoading("btn-danger", false, "", "fa-xmark");

  constructor(
    private careerService: CareerService,
    private toastService: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.getAllCareers();
  }

  showCreate() {
    this.newCareer = new CareerResponse();
  }

  saveCareer() {
    if (this.buttonSave.loading) {
      return;
    }
    this.buttonSave.loading = true;
    this.careerService.createCareer(this.newCareer).subscribe({
      next: (response: CareerResponse) => {
        this.buttonSave.loading = false;
        this.newCareer = null;
        this.getAllCareers();
        this.toastService.success("Career created successfully");
      },
      error: (error: HttpErrorResponse) => {
        this.buttonSave.loading = false;
        this.toastService.error(error.error);
      }
    })
  }

  search() {
    clearTimeout(this.timeout);
    if (this.searchWord.length > 5) {
      this.timeout = setTimeout(() => {
        this.careerService.searchCareerByName(this.searchWord).subscribe({
          next: (response: CareerResponse[]) => {
            this.careers = response;
          },
          error: (error: HttpErrorResponse) => {
            this.toastService.error(error.error);
          }
        })
      }, 500);
    }
    if (this.searchWord.length == 0) {
      this.getAllCareers();
    }
  }

  getAllCareers() {
    this.careerService.getAllCareers().subscribe({
      next: (response: CareerResponse[]) => {
        this.careers = response;
      },
      error: (error: HttpErrorResponse) => {
        this.toastService.error(error.error);
      }
    })
  }

  editCareer(career: CareerResponse) {
    if (this.buttonEdit.loading) {
      return;
    }
    this.buttonEdit.loading = true;
    this.careerService.updateCareer(career.careerId, career).subscribe({
      next: (response: CareerResponse) => {
        this.buttonEdit.loading = false;
        this.careerId = null;
        this.getAllCareers();
        this.toastService.success("Career created successfully");
      },
      error: (error: HttpErrorResponse) => {
        this.buttonEdit.loading = false;
        this.toastService.error(error.error);
      }
    })
  }

}
