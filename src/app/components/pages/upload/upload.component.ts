import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TypeItemEnum } from 'src/app/enums/type-file.enum';
import { LineContent } from 'src/app/models/line-report.model';
import { CreatedResponse } from 'src/app/models/upload.model';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  selectedFile: File | null = null;
  todayDate = "";
  lines: LineContent[] = [];
  types = TypeItemEnum;
  loading = false;
  constructor(
    private uploadService: UploadService,
    private toastService: ToastrService
  ) {
    this.todayDate = (new Date()).toISOString().split('T')[0];
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.previewFile();
    }
  }

  previewFile(): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const text = e.target.result;
      this.processFileContent(text);
    };
    reader.readAsText(this.selectedFile);
  }

  processFileContent(content: string): void {
    content = content.replace("\r","");
    this.lines = content.split('\n').map(line => new LineContent(line, '', this.getType(line)));
  }

  actual = null;

  getType(line:string){
    line = line.trim();
    console.log(line.includes("TITULO:"));
    if (line == "LIBRO"){
      this.actual = TypeItemEnum.BOOK;
      return TypeItemEnum.BOOK;
    } else if (line == "ESTUDIANTE") {
      this.actual = TypeItemEnum.STUDENT;
      return TypeItemEnum.STUDENT;
    } else if (line == "CARRERA"){
      this.actual = TypeItemEnum.CAREER;
      return TypeItemEnum.CAREER;
    } else if (line == "PRESTAMO"){
      this.actual = TypeItemEnum.LOAN;
      return TypeItemEnum.LOAN;
    } else if (line == ""){
      return TypeItemEnum.SPACE;
    } else if (line.includes("TITULO:") || line.includes("AUTOR:") || line.includes("CANTIDAD:")) {
      return (this.actual && this.actual == TypeItemEnum.BOOK) ? TypeItemEnum.BOOK : TypeItemEnum.ERROR;
    } else if (line.includes("FECHA:") || line.includes("CODIGOLIBRO:")) {
      return (this.actual && this.actual == TypeItemEnum.LOAN) ? TypeItemEnum.LOAN : TypeItemEnum.ERROR;
    } else if (line.includes("CARRERA:")) {
      return (this.actual && this.actual == TypeItemEnum.STUDENT) ? TypeItemEnum.STUDENT : TypeItemEnum.ERROR;
    } else if (line.includes("CODIGO:")) {
      if (!this.actual){
        return TypeItemEnum.ERROR;
      } else {
        if (this.actual == TypeItemEnum.BOOK || this.actual == TypeItemEnum.CAREER){
          return this.actual;
        } else {
          return TypeItemEnum.ERROR;
        }
      }
    } else if (line.includes("CARNET:")) {
      if (!this.actual){
        return TypeItemEnum.ERROR;
      } else {
        if (this.actual == TypeItemEnum.LOAN || this.actual == TypeItemEnum.STUDENT){
          return this.actual;
        } else {
          return TypeItemEnum.ERROR;
        }
      }
    }  else if (line.includes("NOMBRE:")) {
      if (!this.actual){
        return TypeItemEnum.ERROR;
      } else {
        if (this.actual == TypeItemEnum.STUDENT || this.actual == TypeItemEnum.CAREER){
          return this.actual;
        } else {
          return TypeItemEnum.ERROR;
        }
      }
    } else {
      return TypeItemEnum.ERROR;
    }
  }

  getValidate(line, type) {
    line = line.trim();
    if (line == "LIBRO" && type == "BOOK"){
      return true;
    } else if (line == "PRESTAMO" && type == "LOAN"){
      return true;
    } else if (line == "ESTUDIANTE" && type == "STUDENT"){
      return true;
    } else if (line == "CARRERA" && type == "CAREER"){
      return true;
    }
    return false;
  }

  checkForErrors(line: string): boolean {
    // Define your error checking logic here
    // For demonstration, let's say a line with the word 'error' is considered an error
    return line.toLowerCase().includes('error');
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.loading = true;
      this.uploadService.uploadFile(this.selectedFile, this.todayDate).subscribe(
        {
          next: (response: CreatedResponse) => {
            this.loading = false;
            response.errors.forEach((error) => {
              if (error.line>0){
                this.lines[error.line-1].error = error.reason;
                this.lines[error.line-1].type = TypeItemEnum.ERROR;
              }
            });
            response.books.forEach((book)=>{
              this.lines.forEach((line)=>{
                if (line.content.includes("CODIGO:") && line.content.includes(book.isbn)){
                  line.error = "SAVED";
                }
              });
            });
            response.students.forEach((student)=>{
              this.lines.forEach((line)=>{
                if (line.content.includes("CARNET:") && line.content.includes(student.license)){
                  line.error = "SAVED";
                }
              });
            });
            response.careers.forEach((career)=>{
              this.lines.forEach((line)=>{
                if (line.content.includes("CODIGO:") && line.content.includes(career.careerId+"")){
                  line.error = "SAVED";
                }
              });
            });
            this.toastService.success('File uploaded successfully');
          },
          error: (error: HttpErrorResponse) => {
            console.log(error);
            this.loading = false;
            this.toastService.error(error.error);
          }
        }
      );
    }
  }
}
