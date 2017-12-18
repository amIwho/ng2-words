import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'words-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: any;
  searchForm: FormGroup;
  searching = false;

  constructor(
    private userService: UserService,
    private _fb: FormBuilder,
    private router: Router
  ) {
    this.userService.getCurrentUser()
      .subscribe(
      (user) => {
        if (user === null) {
          // this.router.navigate(['/signin']);
        } else {
          this.currentUser = user;
        }
      });
  }

  ngOnInit(): void {
    this.searchForm = this._fb.group({
      search: this._fb.control('')
    });
  }

  signout() {
    this.userService.logout()
      .subscribe(() => {
      this.router.navigate(['/signin']);
    });
  }


}
