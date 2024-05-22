export class LineContent {
	content: string;
	error: string;
	type: number;

	constructor(content: string, error: string, type: number) {
		this.content = content;
		this.error = error;
		this.type = type;
	  }
}