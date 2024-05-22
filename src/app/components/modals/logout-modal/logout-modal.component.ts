import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookingRequest, BookingResponse } from 'src/app/models/booking.model';
import { ButtonLoading } from 'src/app/models/loading-button.model';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.scss']
})
export class LogoutModalComponent {
  @Output() close = new EventEmitter<any>();
  buttonSave = new ButtonLoading("btn-success",false,"YES","fa-right-from-bracket")
  @Input() request = new BookingRequest();

  constructor(
    private authService: AuthService,
    private router: Router
  ){
  }

  logout(){
    this.authService.logout();
    window.location.reload();
  }
}
