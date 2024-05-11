import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseUrl =  'https://localhost:44361/api/v1/Books'

  constructor(private http: HttpClient) { }
  
  getAllBooks(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  addNewBook(reqBody: any): Observable<any> {
    return this.http.post(this.baseUrl, reqBody);
  }

}
