import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';


//todo: перенести логин и регистрацию на сервер
@Component({
  selector: 'words-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: string;
  loginForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this._fb.group({
      username: this._fb.control(''),
      password: this._fb.control('')
    });
  }

  login() {
    this.userService.signin(this.loginForm.value).subscribe((user: any) => {
      if (user._id) {
        this.router.navigate(['/']);
      }
    }, (err) => {
        this.error = err.json().message;
    });
  }

}
