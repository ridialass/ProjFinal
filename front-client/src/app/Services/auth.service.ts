import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:5000/api/Account';

  constructor(private http: HttpClient, private router: Router) {}

  register(username: string, email: string, password: string) {
    return this.http.post(`${this.API_URL}/Register`, { username, email, password });
  }

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(`${this.API_URL}/Login`, { username, password })
      .subscribe(response => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']);
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}