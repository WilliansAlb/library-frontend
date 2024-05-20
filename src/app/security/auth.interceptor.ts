import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpEvent, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(private http: HttpClient, private router: Router) { }

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		// Obtén el token de autorización del almacenamiento local o de donde lo almacenes
		const authToken = localStorage.getItem('jwt'); // Asegúrate de tener un nombre de clave adecuado
		if (request.url.includes('auth')) {
			return next.handle(request);
		} else {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ` + authToken
				}
			});
		}
		return next.handle(request);
	}

}