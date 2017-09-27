import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'words-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  error: string;
  signupForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.signupForm = this._fb.group({
      email: this._fb.control(''),
    });
  }

  sendToken() {
    this.userService.sendToken(this.signupForm.get('email').value).subscribe((res) => console.log(res));
  }

}
