import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  constructor() { }

  ngOnInit(): void {
  }

  setRegisterMode(){
    this.registerMode = true
  }

  cancelRegisterMode(_registerMode: boolean){
    this.registerMode = _registerMode
  }

}
