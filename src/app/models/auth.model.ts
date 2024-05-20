export class AuthRequest {
	username: string;
	password: string;
}

export class AuthResponse {
	token: string;
}

export class CreationRequest {
	license: string;
	username: string;
	password: string;
	name: string;
	birthday!: string;
	day!: string;
	month!: string;
	year!: string;
}