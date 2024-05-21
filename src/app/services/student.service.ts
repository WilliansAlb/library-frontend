import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthRequest } from '../models/auth.model';
import { jwtDecode } from 'jwt-decode';
import { BookResponse } from '../models/book.model';
import { CareerResponse } from '../models/career.model';
import { StudentResponse } from '../models/student.model';

@Injectable({
	providedIn: 'root'
})
export class StudentService {
	private URL = `${environment.LIBRARY_BACKEND_URL}/students`;

	constructor(private http: HttpClient) {
	}

	getAllStudents() {
		return this.http.get(this.URL);
	}

	hasPendingInvitation(license: string) {
		return this.http.get(this.URL + `/hasPendingInvitation/${license}`);
	}

	createStudent(request: StudentResponse){
		return this.http.post(this.URL, request);
	}

	searchStudent(search:string, careerId){
		return this.http.get(this.URL + `/search`, {
			params: {
				search: search,
				careerId: careerId
			}
		});
	}
}