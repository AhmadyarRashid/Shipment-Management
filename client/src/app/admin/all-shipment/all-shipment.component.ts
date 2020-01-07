import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AddShipmentComponent} from '../add-shipment/add-shipment.component';
import {AssignWorkersComponent} from '../assign-workers/assign-workers.component';
import {FormControl} from '@angular/forms';
import {ShipmentService} from '../../shared/shipment.service';
import {UserService} from '../../shared/user.service';
import Swal from 'sweetalert2';

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

  displayedColumns: string[] = ['id', 'name', 'description', 'status', 'action'];
  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  dataSource: MatTableDataSource<ShipmentSchema>;

  shipments = [];
  allWorkers = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Inject(MAT_DIALOG_DATA) public data: any;

  constructor(public dialog: MatDialog, private shipmentService: ShipmentService, private userService: UserService) {
    this.dataSource = new MatTableDataSource(this.shipments);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllShipments();
    this.getAllWorkers();
  }

  getAllShipments() {
    this.shipmentService.getAllShipments().subscribe(res => {
      console.log('--- get all shipments --', res['data']);
      this.dataSource.data = res['data'];
    });
  }

  getAllWorkers() {
    this.userService.getAllWorker().subscribe(res => {
      this.allWorkers = res['data'];
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  handlerAssign(id) {
    const dialogConfigAssign = new MatDialogConfig();
    const prevWorkerIds = this.dataSource.data.filter(item => item['_id'] == id)[0]['workers'];
    const workers = this.allWorkers;
    dialogConfigAssign.data = {id, prevWorkerIds, workers};

    dialogConfigAssign.width = '500px';
    const dialogAssign = this.dialog.open(AssignWorkersComponent, dialogConfigAssign);
    dialogAssign.afterClosed().subscribe(value => {
      if (value) {
        this.shipmentService.assignWorkers(value.id, value.selected).subscribe(res => {
          this.getAllShipments();
        });
      }
    });
  }

  addShipmentHandler() {
    const dialogConfig = new MatDialogConfig();
    const dialog = this.dialog.open(AddShipmentComponent, dialogConfig);
    dialog.afterClosed().subscribe(value => {
      this.shipmentService.addShipment(value['name'], value['description']).subscribe(res => {
        this.getAllShipments();
      });
    });
  }

  deleteShipmentHandler(id) {
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
        this.shipmentService.deleteShipment(id)
          .subscribe(res => {
            Swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            );
            this.getAllShipments();
          });
      }
    });
  }

}
