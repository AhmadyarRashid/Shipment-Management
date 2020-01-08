import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-add-worker',
  templateUrl: './add-worker.component.html',
  styleUrls: ['./add-worker.component.css']
})
export class AddWorkerComponent implements OnInit {
  dialogData: any;

  constructor(public dialogRef: MatDialogRef<AddWorkerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {}

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
      this.dialogRef.close(this.dialogData);
    } else {
      console.log('----- form not be able to submit ----');
    }

  }

}
