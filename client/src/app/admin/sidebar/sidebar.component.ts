import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  // logout button handler to clear all browser cache
  logoutHandler() {
    this.userService.logout().subscribe(res => {

    }, err => {

    }, () => {
      localStorage.setItem('token', '');
      localStorage.setItem('id', '');
      localStorage.setItem('role', '');
      this.router.navigate(['../login']);
    });
  }

}
