import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActionEnum } from 'src/app/enums/action.enum';
import { RoleEnum } from 'src/app/enums/role.enum';
import { BookResponse } from 'src/app/models/book.model';
import { BookingRequest } from 'src/app/models/booking.model';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  books:BookResponse[] = [];
  bookView: BookResponse = null;
  bookingRequest: BookingRequest = null;
  actionView: number = ActionEnum.CREATE;
  actions = ActionEnum;
  role = RoleEnum;
  searchWord = "";
  timeout = null;
  todayDate = "";

  constructor(
    private bookService: BookService,
    private toastService: ToastrService,
    private authService: AuthService
  ){
    this.todayDate = (new Date()).toISOString().split("T")[0];
  }

  search(){
    clearTimeout(this.timeout);
    if (this.searchWord.length > 5){
      this.timeout = setTimeout(() => {
        this.bookService.getBooksBySearch(this.searchWord).subscribe({
          next: (response:BookResponse[]) => {
            this.books = response;
          },
          error: (error: HttpErrorResponse) => {
            this.toastService.error(error.error);
          }
        })
      }, 500);
    }
    if (this.searchWord.length == 0){
      this.getAllBooks();
    }
  }

  closeModal(event){
    this.bookView = null;
    this.actionView = ActionEnum.CREATE;
  }

  createBook(){
    this.actionView = ActionEnum.CREATE; 
    this.bookView = new BookResponse()
  }

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks(){
    this.bookService.getAllBooks().subscribe({
      next:(response: BookResponse[])=>{
        this.books = response;
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  showBookingModal(book:BookResponse){
    this.bookingRequest = new BookingRequest();
    this.bookingRequest.book = book;
    var student = this.authService.getStudent();
    this.bookingRequest.student = student;
  }
}
