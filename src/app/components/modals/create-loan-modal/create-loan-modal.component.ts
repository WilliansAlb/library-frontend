import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookResponse } from 'src/app/models/book.model';
import { InputAutocompleteConfiguration } from 'src/app/models/input-autocomplete.model';
import { BookService } from 'src/app/services/book.service';
import { StudentService } from 'src/app/services/student.service';
import { LoanStudentRequest, LoanStudentResponse } from 'src/app/models/loan.model';
import { StudentResponse } from 'src/app/models/student.model';
import { ButtonLoading } from 'src/app/models/loading-button.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-create-loan-modal',
  templateUrl: './create-loan-modal.component.html',
  styleUrls: ['./create-loan-modal.component.scss']
})
export class CreateLoanModalComponent implements OnInit {
  @Output() close = new EventEmitter<any>();
  @Input() toCreate = new LoanStudentRequest();
  books: BookResponse[] = [];
  students: StudentResponse[] = [];
  bookSelected: BookResponse = null;
  configurationBooks: InputAutocompleteConfiguration = new InputAutocompleteConfiguration("fa-list", true, false, null, "");
  configurationStudents: InputAutocompleteConfiguration = new InputAutocompleteConfiguration("fa-list", true, false, null, "");
  buttonSave = new ButtonLoading("btn-success", false, "SAVE", "fa-save");
  booksAdded: { [key: string]: boolean } = {};
  response: LoanStudentResponse[] = [];

  constructor(
    private studentService: StudentService,
    private bookService: BookService,
    private toastService: ToastrService,
    private loanService: LoanService
  ) {

  }

  ngOnInit(): void {
    this.getAllBooks();
    this.getAllStudents();
  }


  searchBook = (searchWord, items) => {
    searchWord = searchWord.toLowerCase();
    return items.filter((book) => {
      return book.isbn == searchWord || book.title.toLowerCase().includes(searchWord)
        || book.author.toLowerCase().includes(searchWord)
    });
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

  addToBookList() {
    if (this.booksAdded[this.bookSelected.isbn]) {
      this.toastService.error("It's already added the book!");
      return;
    }
    if (this.bookSelected.availableCopies <= 0) {
      this.toastService.error("The book doesnt have copies");
      return;
    }
    this.toCreate.bookList.push(this.bookSelected);
    this.booksAdded[this.bookSelected.isbn] = true;
  }

  getAllBooks() {
    this.bookService.getAllBooks().subscribe({
      next: (response: BookResponse[]) => {
        this.books = response;
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

  saveLoan() {
    if (this.buttonSave.loading) {
      return;
    }
    this.buttonSave.loading = true;
    this.loanService.createLoan(this.toCreate).subscribe({
      next: (response: LoanStudentResponse[]) => {
        var tempResponse = response.filter((res) => {
          return !res.lended;
        })
        if (tempResponse.length > 0) {
          this.toastService.success("Loan created with some errors...");
          this.response = response;
        } else {
          this.toastService.success("Loan created successfully!");
          this.close.emit(null);
        }
        this.buttonSave.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.buttonSave.loading = false;
        this.toastService.error(error.error);
      }
    })
  }
}
