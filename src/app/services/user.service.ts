import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthRequest, CreationRequest } from '../models/auth.model';
import { jwtDecode } from 'jwt-decode';
import { BookResponse } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL = `${environment.LIBRARY_BACKEND_URL}/users`;

  constructor(private http: HttpClient) {
  }

  createUserStudent(creationRequest: CreationRequest){
	return this.http.post(this.URL + "/student", creationRequest);
  }
}