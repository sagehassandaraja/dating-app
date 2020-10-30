import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../_model/user';

// dont need this when using jwtModule config in app module
// const httpOptions ={
//   headers: new HttpHeaders({
//     'Authorization': 'Bearer ' + localStorage.getItem('token')
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class UserService {
baseUrl = environment.apiUrl;

  constructor(private _httpClient: HttpClient) { }

  getUsers():Observable<User[]>{
    return this._httpClient.get<User[]>(this.baseUrl + 'users')
  }

  getUser(id): Observable<User>{
    return this._httpClient.get<User>(this.baseUrl + 'users/' + id)
  }
}
