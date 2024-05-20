import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthRequest } from '../models/auth.model';
import { jwtDecode } from 'jwt-decode';
import { BookResponse } from '../models/book.model';
import { CareerResponse } from '../models/career.model';

@Injectable({
	providedIn: 'root'
})
export class CareerService {
	private URL = `${environment.LIBRARY_BACKEND_URL}/careers`;

	constructor(private http: HttpClient) {
	}

	getAllCareers() {
		return this.http.get(this.URL);
	}

	searchCareerByName(name: string) {
		return this.http.get(this.URL + `/search/${name}`);
	}

	createCareer(toCreate: CareerResponse) {
		return this.http.post(this.URL, toCreate);
	}

	updateCareer(careerId: number, toUpdate: CareerResponse) {
		return this.http.put(this.URL + `/update/${careerId}`, toUpdate);
	}
}