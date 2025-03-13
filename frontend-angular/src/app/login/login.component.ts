import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  public loginFormGroup!:FormGroup;

  constructor(private fb: FormBuilder,private authService:AuthenticationService,private router:Router) {
  }

    ngOnInit(): void {
      this.loginFormGroup=this.fb.group({
        username:this.fb.control(''),
        password:this.fb.control(''),
      })
    }

    login(){
      let username=this.loginFormGroup.value.username;
      let password=this.loginFormGroup.value.password;
      let auth:boolean=this.authService.login(username,password);
      if(auth){
        this.router.navigateByUrl("/admin");
      }
    }
}
