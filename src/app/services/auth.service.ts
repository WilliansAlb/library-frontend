import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthRequest } from '../models/auth.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = `${environment.LIBRARY_BACKEND_URL}/auth`;

  constructor(private http: HttpClient) {
  }

  login(data: AuthRequest) {
    return this.http.post(this.URL, data);
  }

  setToken(token: string) {
    localStorage.setItem('jwt', token);
  }

  getToken() {
    return localStorage.getItem('jwt');
  }

  logout() {
    localStorage.clear();
  }

  getRoles() {
    var token = this.getToken();
    try {
      const decodedToken = jwtDecode(token);
      const authorities = decodedToken['authorities'];
      var roles: { [key: number]: boolean } = {};
      authorities.forEach(element => {
        roles[element.authority] = true;
      });
      return roles;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}