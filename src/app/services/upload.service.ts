import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class UploadService {
	private URL = `${environment.LIBRARY_BACKEND_URL}/upload`;

	constructor(private http: HttpClient) {
	}

	uploadFile(file: File, todayDate: any) {
		const formData: FormData = new FormData();
		formData.append('document', file, file.name);

		return this.http.post(this.URL + "/file", formData, {
			params: {
				todayDate: todayDate
			}
		});
	}
}