import { BookResponse } from "./book.model";
import { StudentResponse } from "./student.model";

export class BookingResponse {
	bookingId: number;
	book: BookResponse;
	student: StudentResponse;
	releaseDate: any;
	limitDate: any;
	showed: boolean;
}

export class BookingRequest {
	student: StudentResponse;
	book: BookResponse;
}