import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-add-shipment',
  templateUrl: './add-shipment.component.html',
  styleUrls: ['./add-shipment.component.css']
})
export class AddShipmentComponent implements OnInit {
  dialogData: any;
  name: string;
  description: string;

  constructor(public dialogRef: MatDialogRef<AddShipmentComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.dialogData = this.data;
    console.log(this.dialogData);
  }

  close() {
    this.dialogData = {
      name: this.name,
      description: this.description
    };
    this.dialogRef.close(this.dialogData);
  }

}
