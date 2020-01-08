import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-add-worker',
  templateUrl: './add-worker.component.html',
  styleUrls: ['./add-worker.component.css']
})
export class AddWorkerComponent implements OnInit {
  dialogData: any;
  error: string;

  constructor(public dialogRef: MatDialogRef<AddWorkerComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService) {
  }

  ngOnInit() {
    this.error = null;
  }

  // add new worker handler
  addWorkerHandler(value, event: Event) {
    event.preventDefault();
    this.dialogData = {
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      password: value.password,
      city: value.city,
      postalCode: value.postalCode,
      address: value.address
    };
    if (value.password && value.firstName && value.lastName && value.city && value.email) {
      // email must be contain @ character
      if (value.email.indexOf('@') < 0) {
        this.error = 'email is not correct';
      } else if (value.password.length < 6) {     // length of password field must be greater than 6
        this.error = 'password must be greater than 6 characters';
      } else {
        const workerData = {...value, name: value.firstName + ' ' + value.lastName};
        this.userService.registerWorker(workerData).subscribe(res => {
          console.log(res);
          if (res['isSuccess'] === false) {
            this.error = res['message'];        // if email is already exists
          } else {
            this.error = null;
            this.dialogRef.close(this.dialogData);
          }
        });
      }
    } else {
      console.log('----- form not be able to submit ----');
    }
  }
}
