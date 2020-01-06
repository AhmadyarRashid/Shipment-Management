import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AddWorkerComponent} from '../add-worker/add-worker.component';
import {UserService} from '../../shared/user.service';

export interface WorkerSchema {
  _id: string;
  name: string;
  email: string;
  phoneNo: string;
}

@Component({
  selector: 'app-all-worker',
  templateUrl: './all-worker.component.html',
  styleUrls: ['./all-worker.component.css']
})

export class AllWorkerComponent implements OnInit {

  displayedColumns: string[] = ['_id', 'name', 'email', 'phoneNo', 'delete'];
  dataSource: MatTableDataSource<WorkerSchema>;
  workers = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Inject(MAT_DIALOG_DATA) public data: any;

  constructor(public dialog: MatDialog, private userService: UserService) {
    this.dataSource = new MatTableDataSource(this.workers);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllWorker();
  }

  getAllWorker() {
    this.userService.getAllWorker().subscribe(
      result => {
        // Handle result
        this.dataSource.data = result['data'];
      },
      error => {
        // this.errors = error;
      },
      () => {
        // 'onCompleted' callback.
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  handlerDelete(id) {
    console.log('--- delete user id ---', id);
    this.userService.deleteWorker(id).subscribe(res => {
      console.log(res);
      this.getAllWorker();
    });
  }

  addWorkerHandler() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {name: 'some name'};
    const dialog = this.dialog.open(AddWorkerComponent, dialogConfig);
    dialog.afterClosed().subscribe(value => {
      const workerData = {...value, name: value.firstName + ' ' + value.lastName};
      this.userService.registerWorker(workerData).subscribe(res => {
        console.log('---- register user ---', res);
        this.getAllWorker();
      });
    });
  }
}

