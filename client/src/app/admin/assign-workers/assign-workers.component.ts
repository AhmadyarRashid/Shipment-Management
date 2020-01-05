import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-assign-workers',
  templateUrl: './assign-workers.component.html',
  styleUrls: ['./assign-workers.component.css']
})
export class AssignWorkersComponent implements OnInit {
  selectedToppings: any;
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  dialogData: any;
  id: any;

  constructor(public dialogRef: MatDialogRef<AssignWorkersComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.dialogData = this.data;
    this.id = this.data.id;
    console.log(this.dialogData);
  }

  close() {
    console.log('selected list', this.selectedToppings);
    this.dialogRef.close({selected: this.selectedToppings, id: this.id});
  }

}
