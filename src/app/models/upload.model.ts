import { BookResponse } from "./book.model";
import { CareerResponse } from "./career.model";
import { LoanResponse } from "./loan.model";
import { StudentResponse } from "./student.model";

export class CreatedResponse {
	errors: FileErrorResponse[];
	books: BookResponse[];
	students: StudentResponse[];
	loans: LoanResponse[];
	careers: CareerResponse[]; 
}

export class FileErrorResponse {
	line: number;
	reason: string;
}