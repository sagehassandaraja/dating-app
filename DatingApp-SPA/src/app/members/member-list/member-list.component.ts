import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_model/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users:User[];

  constructor(private _userService: UserService,private _alertify: AlertifyService
    ,private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRoute.data.subscribe(data =>{
      this.users = data['users'];
    });
  }

  // loadUsers(){
  //   return this._userService.getUsers().subscribe((_user: User[])=>{
  //     this.users = _user
  //   },error => {
  //     this._alertify.error(error.message)
  //   });
  // }
}
