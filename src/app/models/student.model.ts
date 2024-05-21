import { CareerResponse } from "./career.model";
import { UserResponse } from "./user.model";

export class StudentResponse {
	license: string;
	userLibrary: UserResponse;
	career: CareerResponse = new CareerResponse();
	name: string;
	birthday: string;
}