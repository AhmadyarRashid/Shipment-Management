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

  ngOnInit() {
    this.dialogData = this.data;
    console.log(this.dialogData);
  }

  close() {
    this.dialogData = {
      firstName : 'asd',
      lastName : 'xyz',
      phoneNo: '03xx-xxxxxxx',
      email : 'asd@gmail.com'
    }
    this.dialogRef.close(this.dialogData);
  }

}
