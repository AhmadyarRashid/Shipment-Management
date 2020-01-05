import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-add-worker',
  templateUrl: './add-worker.component.html',
  styleUrls: ['./add-worker.component.css']
})
export class AddWorkerComponent implements OnInit {
  dialogData: any;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  email: string;
  password: string;

  constructor(public dialogRef: MatDialogRef<AddWorkerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.dialogData = this.data;
    console.log(this.dialogData);
  }

  close() {
    this.dialogData = {
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNo: '123',
      email: this.email,
      password: this.password,
      city: this.city,
      postalCode: this.postalCode,
      address: this.address
    };
    this.dialogRef.close(this.dialogData);
  }

}
