import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginDetail : any = []
  constructor(private http: HttpClient, private router:Router) { }
  login(email: string, password: string) {
     this.loginDetail = {
      email
    }
  }
  public isUserLoggedIn() {
    localStorage.getItem('email') !== null;
    return localStorage.getItem('email') !== null;
  }
  public logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
  }
}