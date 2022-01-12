import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private formbuilder: FormBuilder, private http:HttpClient, private router:Router) {}

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: [''],
      password: ['']
    })
  }
  
  login(){
    this.http.get<any>('http://localhost:3000/users').subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      })
      if (user) {
        alert("login successful");
        this.loginForm.reset();
        this.router.navigate(['restaurents'])
      }else{
        alert("Email or Password did not match!!")
      }
    },err=>{alert("Occured issue on server side ")});
  }
}
