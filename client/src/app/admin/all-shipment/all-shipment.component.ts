import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AddShipmentComponent} from '../add-shipment/add-shipment.component';
import {AssignWorkersComponent} from '../assign-workers/assign-workers.component';
import {FormControl} from '@angular/forms';

export interface ShipmentSchema {
  id: string;
  name: string;
  description: string;
  workers: any;
  status: boolean;
}

@Component({
  selector: 'app-all-shipment',
  templateUrl: './all-shipment.component.html',
  styleUrls: ['./all-shipment.component.css']
})
export class AllShipmentComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'workers', 'action'];
  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  dataSource: MatTableDataSource<ShipmentSchema>;

  shipments = [
    {id: '1', name: 'laptops', description: '', workers: ['a', 'b', 'c', 'd'], status: false},
    {id: '2', name: 'bags', description: '', workers: [], status: false},
    {id: '3', name: 'cars', description: '', workers: [], status: false},
    {id: '4', name: 'boxes', description: '', workers: [], status: false},
    {id: '5', name: 'pens', description: '', workers: [], status: false},
  ];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Inject(MAT_DIALOG_DATA) public data: any;

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.shipments);
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

  handlerAssign(id) {
    console.log('===== Assign shipment id ====', id);
    const dialogConfigAssign = new MatDialogConfig();
    dialogConfigAssign.data = {id};
    dialogConfigAssign.width = '500px';
    const dialogAssign = this.dialog.open(AssignWorkersComponent, dialogConfigAssign);
    dialogAssign.afterClosed().subscribe(value => {
      // let maxId = this.dataSource.data[this.dataSource.data.length - 1].id;
      // console.log(maxId);
      // const newData = this.dataSource.data.concat({...value, id: Number(maxId) + 1, workers: [], status: false});
      // this.dataSource.data = newData;
      console.log(`-----Dialog sent: ${JSON.stringify(value)}`);
    });
  }

  addShipmentHandler() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {name: 'some name'};
    const dialog = this.dialog.open(AddShipmentComponent, dialogConfig);
    dialog.afterClosed().subscribe(value => {
      let maxId = this.dataSource.data[this.dataSource.data.length - 1].id;
      console.log(maxId);
      const newData = this.dataSource.data.concat({...value, id: Number(maxId) + 1, workers: [], status: false});
      this.dataSource.data = newData;
      console.log(`-----Dialog sent: ${JSON.stringify(value)}`);
    });
  }

}
