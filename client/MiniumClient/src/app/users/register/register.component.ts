import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form;
  constructor(private builder:FormBuilder) { }

  ngOnInit() {
    this.form=this.builder.group({
      'email':'
    });
  }

}
