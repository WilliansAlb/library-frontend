import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActionEnum } from 'src/app/enums/action.enum';
import { RoleEnum } from 'src/app/enums/role.enum';
import { BookResponse } from 'src/app/models/book.model';
import { ButtonLoading } from 'src/app/models/loading-button.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.scss', './book-modal-preview.scss']
})
export class BookModalComponent {
  buttonSave: ButtonLoading = new ButtonLoading("btn-success", false, "SAVE", "fa-save");
  buttonEdit: ButtonLoading = new ButtonLoading("btn-info", false, "EDIT", "fa-edit");
  role = RoleEnum;
  @Output() close = new EventEmitter<any>();
  @Input() book = new BookResponse();
  actions = ActionEnum;
  @Input() action: number = ActionEnum.PREVIEW;

  constructor(
    private bookService: BookService,
    private toastService: ToastrService
  ) {

  }

  saveBook() {
    if (this.action == ActionEnum.CREATE) {
      this.buttonSave.loading = true;
      this.book.copies = (this.book.copies) ? this.book.copies : 1;
      this.bookService.createBook(this.book).subscribe({
        next: (response: BookResponse) => {
          this.buttonSave.loading = false;
          this.toastService.success("Book created successfully!")
        },
        error: (error: HttpErrorResponse) => {
          this.buttonSave.loading = false;
          this.toastService.error(error.error);
        }
      });
    } else {
      this.buttonSave.loading = true;
      this.bookService.updateBook(this.book.isbn, this.book).subscribe({
        next: (response: BookResponse) => {
          this.buttonSave.loading = false;
          this.toastService.success("Book updated successfully!")
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          this.buttonSave.loading = false;
          this.toastService.error(error.error.message);
        }
      });
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.convertToBase64(file).then(base64 => {
        this.book.frontCover = base64;
        console.log('Base64 string:', this.book.frontCover);
      }).catch(error => {
        console.error('Error converting to base64:', error);
      });
    }
  }

  private convertToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
}
