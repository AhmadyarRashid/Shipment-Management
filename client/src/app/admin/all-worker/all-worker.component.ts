import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AddWorkerComponent} from '../add-worker/add-worker.component';

export interface UserData {
  id: string;
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

  displayedColumns: string[] = ['id', 'name', 'email', 'phoneNo', 'delete'];
  dataSource: MatTableDataSource<UserData>;
  workers = [
    {id: '1', name: 'ali', email: 'ali@gmail.com', phoneNo: '03xx-xxxxxxx'},
    {id: '2', name: 'ali1', email: 'ali1@gmail.com', phoneNo: '03xx-xxxxxxx'},
    {id: '3', name: 'ali2', email: 'ali2@gmail.com', phoneNo: '03xx-xxxxxxx'},
    {id: '4', name: 'ali3', email: 'ali3@gmail.com', phoneNo: '03xx-xxxxxxx'},
    {id: '5', name: 'ali4', email: 'ali4@gmail.com', phoneNo: '03xx-xxxxxxx'},
    {id: '6', name: 'ali5', email: 'ali5@gmail.com', phoneNo: '03xx-xxxxxxx'},
    {id: '7', name: 'ali6', email: 'ali6@gmail.com', phoneNo: '03xx-xxxxxxx'}
  ];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Inject(MAT_DIALOG_DATA) public data: any;

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.workers);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  handlerDelete(id) {
    console.log('--- delete user id ---', id);
    const filterResult = this.dataSource.data.filter(item => item.id !== id);
    this.dataSource.data = filterResult;
  }

  addWorkerHandler() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {name: 'some name'};
    const dialog = this.dialog.open(AddWorkerComponent, dialogConfig);
    dialog.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${JSON.stringify(value)}`);
    });
  }
}

