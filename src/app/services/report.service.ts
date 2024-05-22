import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ReportService {
	private URL = `${environment.LIBRARY_BACKEND_URL}/reports`;

	constructor(private http: HttpClient) {
	}

	loansForToday(todayDate: any) {
		return this.http.get(this.URL + "/loansForToday", {
			params: {
				todayDate: todayDate
			}
		})
	}
	
	loansWithOverdue(todayDate: any) {
		return this.http.get(this.URL + "/loansWithOverdue", {
			params: {
				todayDate: todayDate
			}
		})
	}

	overdueLoans(todayDate: any) {
		return this.http.get(this.URL + "/overdueLoans", {
			params: {
				todayDate: todayDate
			}
		})
	}

	currentlyLendedByStudent(license: string) {
		return this.http.get(this.URL + "/currentlyLendedByStudent", {
			params: {
				license: license
			}
		})
	}

	loansByStudent(license: string, startDate: any, endDate: any) {
		return this.http.get(this.URL + "/loansByStudent", {
			params: {
				license: license,
				startDate: startDate,
				endDate: endDate
			}
		})
	}

	balance(startDate: any, endDate: any) {
		return this.http.get(this.URL + "/balance", {
			params: {
				startDate: startDate,
				endDate: endDate
			}
		})
	}

	topCareer(startDate: any, endDate: any) {
		return this.http.get(this.URL + "/topCareer", {
			params: {
				startDate: startDate,
				endDate: endDate
			}
		})
	}

	topStudent(startDate: any, endDate: any) {
		return this.http.get(this.URL + "/topStudent", {
			params: {
				startDate: startDate,
				endDate: endDate
			}
		})
	}

	notAvailableCopies() {
		return this.http.get(this.URL + "/notAvailableCopies");
	}

	booksNeverLended() {
		return this.http.get(this.URL + "/booksNeverLended");
	}
}