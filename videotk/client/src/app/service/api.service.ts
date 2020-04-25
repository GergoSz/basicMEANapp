import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUri = 'http://localhost:3003/serv';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Create RA
  createRentable(data: any): Observable<any> {
    const url = `${this.baseUri}/addRA`;
    return this.http
      .post(url, data)
      .pipe(catchError(this.errorMgmt));
  }

  // Create R
  createRent(data: any): Observable<any> {
    const url = `${this.baseUri}/addR`;
    return this.http
      .post(url, data)
      .pipe(catchError(this.errorMgmt));
  }

  // Create C
  createClient(data: any): Observable<any> {
    const url = `${this.baseUri}/addC`;
    return this.http
      .post(url, data)
      .pipe(catchError(this.errorMgmt));
  }

  // Get all RA
  getRentables() {
    return this.http.get(`${this.baseUri}/getallRA`);
  }

  // Get all R
  getRents() {
    return this.http.get(`${this.baseUri}/getallR`);
  }

  // Get all C
  getClients() {
    return this.http.get(`${this.baseUri}/getallC`);
  }

  // Get RA by ID
  getRentable(id: any): Observable<any> {
    const url = `${this.baseUri}/getRA/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Get R by ID
  getRent(id: any): Observable<any> {
    const url = `${this.baseUri}/getR/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Get R by ID
  getClient(id: any): Observable<any> {
    const url = `${this.baseUri}/getC/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Update RA
  updateRentable(id: any, data: any): Observable<any> {
    const url = `${this.baseUri}/updateRA/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    );
  }

  // Update R
  updateRent(id: any, data: any): Observable<any> {
    const url = `${this.baseUri}/updateR/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    );
  }

  // Update C
  updateClient(id: any, data: any): Observable<any> {
    const url = `${this.baseUri}/updateRA/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    );
  }

  // Delete RA
  deleteRentable(id: any): Observable<any> {
    const url = `${this.baseUri}/deleteRA/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    );
  }

  // Delete R
  deleteRent(id: any): Observable<any> {
    const url = `${this.baseUri}/deleteR/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    );
  }

  // Delete C
  deleteClient(id: any): Observable<any> {
    const url = `${this.baseUri}/deleteC/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    );
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
