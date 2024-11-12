import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private usernameSubject = new BehaviorSubject<string>('');
  username$ = this.usernameSubject.asObservable();
  private apiUrl = 'https://nodemovilesback-gsa4hgdkabf5cac3.canadacentral-01.azurewebsites.net/login'
    
  obtenerDatos(email: string, password: string): Observable<any> {
      const body = { email, password };  
      return this.http.post<any>(this.apiUrl,body);
    }

  // Set a new username
  setUsername(username: string): void {
    this.usernameSubject.next(username);
  }

  // Optionally, get the current username value
  getUsername(): string{
    return this.usernameSubject.value;
  }

}
