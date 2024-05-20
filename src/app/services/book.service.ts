import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthRequest } from '../models/auth.model';
import { jwtDecode } from 'jwt-decode';
import { BookResponse } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private URL = `${environment.LIBRARY_BACKEND_URL}/books`;

  constructor(private http: HttpClient) {
  }

  getAllBooks(){
	return this.http.get(this.URL);
  }

  createBook(toCreate: BookResponse){
	return this.http.post(this.URL, toCreate);
  }

  updateBook(isbn:string, toUpdate: BookResponse){
	return this.http.put(this.URL + `/update/${isbn}`,toUpdate);
  }

  getBooksBySearch(search:string){
	return this.http.get(this.URL+ `/search/${search}`);
  }
}