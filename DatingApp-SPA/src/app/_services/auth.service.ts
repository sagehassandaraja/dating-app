import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL = "http://localhost:5000/api/auth/";
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private _httpClient : HttpClient ) { }

  login(model: any){
    return this._httpClient.post(this.baseURL+'login', model)
    .pipe(
      map((res: any) => {
        const user = res;
        if(user){
          localStorage.setItem('token',user.token);
          this.decodedToken =this.jwtHelper.decodeToken(user.token);
        }
      })
    )
  }

  register(model: any){
    return this._httpClient.post(this.baseURL+'register', model);
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
