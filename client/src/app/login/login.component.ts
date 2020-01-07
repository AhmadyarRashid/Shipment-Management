import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: string;

  constructor(private  userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.error = null;
  }

  loginHandler(value) {
    console.log('--- login button click ----', value);
    this.userService.login(value.email, value.password).subscribe((res) => {
      console.log(res);
      if (res['isSuccess'] === true) {
        console.log('----- login successfully ---', res);
        this.error = null;
        localStorage.setItem('token', res['data']['token']);
        localStorage.setItem('role', res['data']['role']);
        localStorage.setItem('id', res['data']['_id']);

        if (res['data']['role'] === 'admin') {
          this.router.navigate(['/all-worker']);
        } else {
          this.router.navigate(['/manage-shipment']);
        }
      } else {
        console.log('error', res['message']);
        this.error = res['message'];
      }
    });
  }

}
