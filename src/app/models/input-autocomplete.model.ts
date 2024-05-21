export class InputAutocompleteConfiguration {
	icon: string;
	required: boolean;
	verified: boolean;
	create: boolean;
	value: string;

	constructor(icon, required, verified, create, value){
		this.icon = icon;
		this.required = required;
		this.verified = verified;
		this.create = create;
		this.value = value;
	}
}