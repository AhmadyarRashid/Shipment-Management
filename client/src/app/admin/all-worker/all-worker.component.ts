import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AddWorkerComponent} from '../add-worker/add-worker.component';
import {UserService} from '../../shared/user.service';
import Swal from 'sweetalert2';

// create schema of all worker table data
export interface WorkerSchema {
  _id: string;
  name: string;
  email: string;
  city: string;
}

@Component({
  selector: 'app-all-worker',
  templateUrl: './all-worker.component.html',
  styleUrls: ['./all-worker.component.css']
})

export class AllWorkerComponent implements OnInit {

  // set table header
  displayedColumns: string[] = ['_id', 'name', 'email', 'city', 'delete'];
  // initialization
  dataSource: MatTableDataSource<WorkerSchema>;
  workers = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Inject(MAT_DIALOG_DATA) public data: any;

  constructor(public dialog: MatDialog, private userService: UserService) {
    this.dataSource = new MatTableDataSource(this.workers);
  }

  // on component render first time
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllWorker();
  }

  // get all worker using service
  getAllWorker() {
    this.userService.getAllWorker().subscribe(
      result => {
        // Handle result
        this.dataSource.data = result['data'];
      },
      error => {
        console.log(error);
      },
      () => {
        // 'onCompleted' callback.
      }
    );
  }

  // filter table data
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // delete worker
  handlerDelete(id) {
    console.log('--- delete user id ---', id);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

        this.userService.deleteWorker(id).subscribe(res => {
          console.log(res);
          Swal.fire(
            'Deleted!',
            'Your data has been deleted.',
            'success'
          );
          this.getAllWorker();
        });
      }
    });
  }

  // add new worker
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

