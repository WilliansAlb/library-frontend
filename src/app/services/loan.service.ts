import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoanStudentRequest } from '../models/loan.model';

@Injectable({
	providedIn: 'root'
})
export class LoanService {
	private URL = `${environment.LIBRARY_BACKEND_URL}/loans`;

	constructor(private http: HttpClient) {
	}

	createLoan(request: LoanStudentRequest) {
		return this.http.post(this.URL, request);
	}

	getBalanceLoan(loanId: number, todayDate){
		return this.http.get(this.URL + "/balance", {
			params: {
				todayDate: todayDate,
				loanId: loanId
			}
		})
	}

	getAllLoansByIntervalDateAndStudent(license: string, startDate:any, endDate){
		return this.http.get(this.URL, {
			params: {
				startDate: startDate,
				license: license?license:"-1",
				endDate: endDate
			}
		})
	}
}