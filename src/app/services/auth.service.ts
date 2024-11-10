import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

    private apiUrl = 'https://nodemovilesback-gsa4hgdkabf5cac3.canadacentral-01.azurewebsites.net/login'
    
    obtenerDatos(email: string, password: string): Observable<any> {
      const body = { email, password };  
      return this.http.post<any>(this.apiUrl,body);
    }
}
