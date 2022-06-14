import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthService } from '../_service/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
const endpoint = environment.appUrl;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  loginForm: any = FormGroup;
  userData: any = [];
  filteredUser:any= [];
  constructor( private formBuilder: FormBuilder, private authService: AuthService,  private https: HttpClient, private router: Router) { }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
    });

    this.https.get(endpoint + "/users", {headers: this.getHeader(FormData)}).subscribe((data) => {
      this.userData = data
      console.log(this.userData)
    }, (error) => {
    });
  }

 
  get f() { return this.loginForm.controls; }
  login() {
    this.submitted = true;
    // stop here if form is invalid
    this.filteredUser=this.userData.filter((item:any)=>{
      return this.loginForm.value.email === item.email
    })
    if(this.filteredUser.length > 0){
      localStorage.setItem('email', this.filteredUser[0].email);
      localStorage.setItem('id', this.filteredUser[0].id);
      console.log(localStorage)
      this.router.navigate(['/home']);
    }
  }
  reloadPage(): void {
    window.location.reload();
  }
  getHeader(isFormData?: { new(form?: HTMLFormElement | undefined): FormData; prototype: FormData; }) {
    let headers: HttpHeaders = new HttpHeaders();

    if (!isFormData) {
      headers = headers.append('Content-Type', 'json');
    }
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    return headers;
  }
}