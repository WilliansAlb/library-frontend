import { BookResponse } from "./book.model";
import { StudentResponse } from "./student.model";

export class LoanStudentRequest {
	bookList: BookResponse[] = [];
	student: StudentResponse;
	loanDate: any;
	expectedDate: any;
	todayDate: any;
}

export class LoanStudentResponse {
	toLoan: BookResponse;
	lended: boolean;
	reasonForNotLend: string;
}

export class LoanResponse {
	book: BookResponse;
	expectedDate: any;
	loanDate: any;
	returnDate: any;
	loanId: number;
	penaltyPayment: boolean;
	student: StudentResponse;
}

export class BalanceLoanResponse {
	loan: LoanResponse;
	sanction: number;
	totalLate: number;
	totalNormal: number;
}