import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../_service/auth.service';
const endpoint = environment.appUrl;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private element: any;
  private activeRoute: any;
  post : any = [];
  postComments : any = [];
  form: any = FormGroup;
  constructor(private route: ActivatedRoute,private http: HttpClient, public fb: FormBuilder,  private authService: AuthService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      post_title: "",
      post_body:"",
    })

    var id = localStorage.getItem('id');
    var comments:any=[]
    this.http.get(endpoint + '/users/' + id + '/posts').subscribe((data) => {
      this.post = data;
      let posts=this.post.map((item:any, index:any)=>{

        this.http.get(endpoint + '/posts/' + item.id + '/comments').subscribe((data) => {
          // this.postComments = data;
          this.postComments=data
          this.post[index] = {
           ...item,cmt:data
          }
          
        }, (error) => {
          console.log(error)
        });
      })
      console.log("posts=",this.post)
    }, (error) => {
      console.log(error)
    });
    
  }

  submitForm() {
    
    var formData: any = new FormData();

    fetch(endpoint + '/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: this.form.get('post_title').value,
      body: this.form.get('post_body').value,
      userId: localStorage.getItem('id'),
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => this.post.push(json));

  }

  deletePost(id:any){
    console.log("bjkbjkbjkb")
    fetch(endpoint + '/posts/' + id, {
      method: 'DELETE',
    });
    let post=this.post.filter((item:any)=>{
      return item.id!==id
    })
    this.post=post
  }

  logOut(){
    this.authService.logout();
  }
  
}
