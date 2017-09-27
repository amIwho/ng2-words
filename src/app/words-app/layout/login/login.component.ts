import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'words-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: string;
  loginForm: FormGroup;

  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this._fb.group({
      username: this._fb.control(''),
      password: this._fb.control('')
    })
  }

  login() {

  }

}
