import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;   // 'http://localhost:3000'

  constructor(private http: HttpClient) {}

  getMessage() {
    // calls GET http://localhost:3000/
    return this.http.get(`${this.apiUrl}/`, { responseType: 'text' });
  }
}
