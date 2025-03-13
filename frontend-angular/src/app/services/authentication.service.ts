import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public username!:string;
  public password!:string;
  public roles:any;

  constructor() { }

  public login(username:string,password:string){
    if(username=="admin" && password=="1234"){
      this.username=username;
      this.roles=['ADMIN'];
      return true;
    }else{
      return false;
    }
  }
}
