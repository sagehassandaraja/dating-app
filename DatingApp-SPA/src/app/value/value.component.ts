import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {

  baseURL = 'http://localhost:5000/api/values';
  values: any;

  constructor(private _http: HttpClient) { }

  ngOnInit() {
    this.getValues()
  }

  getValues(){
    this._http.get(this.baseURL).subscribe(res =>{
      return this.values = res,
      err =>{
        console.log(err);
        
      }
    })
  }

}
