import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthRequest } from '../models/auth.model';
import { jwtDecode } from 'jwt-decode';
import { BookResponse } from '../models/book.model';
import { BookingRequest } from '../models/booking.model';

@Injectable({
	providedIn: 'root'
})
export class BookingService {
	private URL = `${environment.LIBRARY_BACKEND_URL}/booking`;

	constructor(private http: HttpClient) {
	}

	findBookingsByStudentAndIntervalDate(license: string, startDate, endDate, todayDate) {
		return this.http.get(this.URL, {
			params:
			{
				license: license,
				startDate: startDate,
				endDate: endDate,
				todayDate: todayDate
			}
		})
	}

	createBooking(request: BookingRequest) {
		return this.http.post(this.URL, request);
	}
}