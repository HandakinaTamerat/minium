import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form;
  constructor(private builder:FormBuilder) { }

  ngOnInit() {
    this.form=this.builder.group({
      'email':['',Validators.required,Validators.email],
      'password':['',Validators.required,Validators.min(6)]
    });
  }

}
