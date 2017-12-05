import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'words-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  error: string;
  signupForm: FormGroup;
  showErrors = false;

  constructor(private _fb: FormBuilder,
              private userService: UserService,
              private router: Router
  ) {
  }

  ngOnInit() {
    this.signupForm = this._fb.group({
      email: this._fb.control('', [Validators.required, Validators.email]),
      passwords: this._fb.group({
        password: this._fb.control('', Validators.required),
        passwordConfirmation: this._fb.control('', Validators.required)
      }, {validator: this.passwordConfirmed})

    });
  }

  passwordConfirmed(control: AbstractControl) {
    const pass1 = control.get('password');
    const pass2 = control.get('passwordConfirmation');
    if (!pass1 && !pass2) return null;

    return pass1.value === pass2.value ? null : {notmatch: true};
  }

  signup(e) {
    e.preventDefault();
    if (this.signupForm.valid) {
      this.userService.signup({username: this.signupForm.get('email').value, password: this.signupForm.get('passwords').value.password})
        .subscribe((res) => {
            this.router.navigate(['/']);
        }, (err) => {
          this.error = err.json().message;
        });
    } else {
      this.showErrors = true;
    }
  }
}
