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

// interface  of shipment to render data in datatable
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

  // set table header
  displayedColumns: string[] = ['id', 'name', 'description', 'status', 'action'];
  // Initialization of datatable, shipment list and all worker list
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
    // get all shipments and worker from service
    this.getAllShipments();
    this.getAllWorkers();
  }

  // get all shipment data and store in shipment list
  getAllShipments() {
    this.shipmentService.getAllShipments().subscribe(res => {
      console.log('--- get all shipments --', res['data']);
      this.dataSource.data = res['data'];
    });
  }

  // get all worker data and store in worker list
  getAllWorkers() {
    this.userService.getAllWorker().subscribe(res => {
      this.allWorkers = res['data'];
    });
  }

  // filter handler of data table
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // assign shiphment to multiple worker
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

  // add new shipment dialog form open
  addShipmentHandler() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    const dialog = this.dialog.open(AddShipmentComponent, dialogConfig);
    dialog.afterClosed().subscribe(value => {
      this.shipmentService.addShipment(value['name'], value['description']).subscribe(res => {
        this.getAllShipments();
      });
    });
  }

  // delete shipmen by id
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
