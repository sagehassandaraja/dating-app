import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {}
  @Output() cancelRegister = new EventEmitter();

  constructor(private _authService: AuthService,private _alertify: AlertifyService) { }

  ngOnInit(): void {
  }

  register(){
    this._authService.register(this.model)
    .subscribe(next =>{
    this._alertify.success('registered successfully');
      
    }),error =>{
      this._alertify.error("error registering:"+ error.message);
      
    }
    
  }

  cancel(){
    this.cancelRegister.emit(false);
    this._alertify.message('cancelled');
    
  }

}
