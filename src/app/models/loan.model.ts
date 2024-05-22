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
	loanPayment: number;
	latePayment: number;
	student: StudentResponse;
}

export class BalanceLoanResponse {
	loan: LoanResponse;
	sanction: number;
	totalLate: number;
	totalNormal: number;
}

export class PayLoanRequest {
	toPay: LoanResponse;
	todayDate: any;
}

export class Report5 {
	totalLate: number;
	totalSanction: number;
	payments:PaymentsByStudent[] = [];
}

export class PaymentsByStudent {
	loan: LoanResponse;
	latePayment: number;
	sanctionPayment: number;
}

export class Report10 {
	studentList: StudentListOverdue[];
}

export class StudentListOverdue{
	student: StudentResponse;
	loans: LoanResponse[] = [];
	totalLate: number = 0;
	totalNormal: number = 0;
}