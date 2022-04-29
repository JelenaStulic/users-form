import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  constructor(private usersService: UsersService, private router: Router) {}
  users$?: Observable<User[]>;

  ngOnInit() {
    this.users$ = this.usersService.getUsers();
  }

  fillForm() {
    this.router.navigate([])
  }
}
