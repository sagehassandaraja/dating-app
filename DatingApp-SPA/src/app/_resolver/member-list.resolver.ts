import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../_model/user';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';

@Injectable({
    providedIn: 'root'
  })

export class MemberListResolver implements Resolve<User[]>{
    constructor(private _router: Router, private _alertify: AlertifyService,
         private _userService: UserService){}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]>{
        return this._userService.getUsers().pipe(
            catchError(err =>{
                this._alertify.error('Problem retrieving data');
                this._router.navigate(['/home']);
                return of(null);
            })
        );
    }
}