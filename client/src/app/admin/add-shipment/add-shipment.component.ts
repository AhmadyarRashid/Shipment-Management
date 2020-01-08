import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-add-shipment',
  templateUrl: './add-shipment.component.html',
  styleUrls: ['./add-shipment.component.css']
})
export class AddShipmentComponent implements OnInit {
  dialogData: any;

  constructor(public dialogRef: MatDialogRef<AddShipmentComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  // add new shipment handler
  addSubmitHandler(value, event: Event) {
    event.preventDefault();
    this.dialogData = {
      name: value.destination,
      description: value.description
    };
    if (value.destination && value.description) {
      this.dialogRef.close(this.dialogData);
    } else {
      console.log('---- not able to submit form---');
    }

  }

}
