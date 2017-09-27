import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'words-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: User;
  searchForm: FormGroup;
  searching = false;

  constructor(
    private userService: UserService,
    private _fb: FormBuilder
  ) {
    this.userService.getCurrentUser().subscribe(
      (user) => {
        this.currentUser = user;
      });
  }

  ngOnInit(): void {
    this.searchForm = this._fb.group({
      search: this._fb.control('')
    });
  }


}
