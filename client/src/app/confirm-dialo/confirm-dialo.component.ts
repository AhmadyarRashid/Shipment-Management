import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-confirm-dialo',
  templateUrl: './confirm-dialo.component.html',
  styleUrls: ['./confirm-dialo.component.css']
})
export class ConfirmDialoComponent implements OnInit {
  title: string;
  message: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<ConfirmDialoComponent>) {
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit() {
  }

  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

}

export class ConfirmDialogModel {

  constructor(public title: string, public message: string) {
  }
}
