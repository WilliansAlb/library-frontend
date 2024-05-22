import { CareerResponse } from "./career.model";
import { LoanResponse } from "./loan.model";
import { StudentResponse } from "./student.model";

export class BalanceReportResponse {
	loanList: LoanResponse[];
	totalNormal: number;
	totalLate: number;
}

export class TopCareerReportResponse {
	count: number;
	career: CareerResponse;
	loanList: LoanResponse[];
}

export class TopStudentReportResponse {
	count: number;
	student: StudentResponse;
	loanList: LoanResponse[];
}