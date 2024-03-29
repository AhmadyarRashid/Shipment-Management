import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-assign-workers',
  templateUrl: './assign-workers.component.html',
  styleUrls: ['./assign-workers.component.css']
})
export class AssignWorkersComponent implements OnInit {
  selectedWorkers: any;
  workers: any;
  dialogData: any;
  id: any;

  constructor(public dialogRef: MatDialogRef<AssignWorkersComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  // all previos selected worker is also checked
  ngOnInit() {
    this.dialogData = this.data;
    this.id = this.data.id;
    this.selectedWorkers = this.data.prevWorkerIds;
    this.workers = this.data.workers;
  }

  // after assign worker check save it
  assignWorkerHandler() {
    this.dialogRef.close({selected: this.selectedWorkers, id: this.id});
  }

}
