import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookingRequest, BookingResponse } from 'src/app/models/booking.model';
import { ButtonLoading } from 'src/app/models/loading-button.model';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.scss']
})
export class BookingModalComponent {
  @Output() close = new EventEmitter<any>();
  buttonSave = new ButtonLoading("btn-success",false,"YES","fa-book-bookmark")
  @Input() request = new BookingRequest();

  constructor(
    private bookingService:BookingService,
    private toastService: ToastrService
  ){

  }

  createBooking(){
    if (this.buttonSave.loading){
      return;
    }
    this.buttonSave.loading = true;
    this.bookingService.createBooking(this.request).subscribe({
      next: (response:BookingResponse) => {
        this.buttonSave.loading = false;
        this.toastService.success("The book is now in the booking list");
        this.close.emit(response);
      }, error: (error: HttpErrorResponse) => {
        this.buttonSave.loading = false;
        this.toastService.error(error.error);
      }
    })
  }
}
