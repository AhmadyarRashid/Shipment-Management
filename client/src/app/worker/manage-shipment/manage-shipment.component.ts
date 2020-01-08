import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MatDialog} from '@angular/material';
import {ShipmentService} from '../../shared/shipment.service';
import {UserService} from '../../shared/user.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2';

// interface of shipment schema for data table
export interface ShipmentSchema {
  _id: string;
  name: string;
  description: string;
  status: boolean;
}

@Component({
  selector: 'app-manage-shipment',
  templateUrl: './manage-shipment.component.html',
  styleUrls: ['./manage-shipment.component.css']
})
export class ManageShipmentComponent implements OnInit {

  // set table header
  displayedColumns: string[] = ['id', 'destination', 'description', 'action'];
  // initialization
  shipments = [];
  dataSource: MatTableDataSource<ShipmentSchema>;
  userId: string;
  error: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dialog: MatDialog, private shipmentService: ShipmentService, private  userService: UserService, private  router: Router) {
    this.dataSource = new MatTableDataSource(this.shipments);
  }

  // first time call after render and also get all shipment those assign to him
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.error = null;
    this.userId = localStorage.getItem('id');
    this.getAllOpenShipments(this.userId);
  }

  // get all user shipments and that are also be opened
  getAllOpenShipments(id) {
    this.shipmentService.getAllShipmentsByUserId(id).subscribe(res => {
      this.dataSource.data = res['data'];
    });
  }

  // filter data in datatable
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // update status of shipments
  updateShipment(id) {
    this.shipmentService.updateShipmentStatus(id, false).subscribe(res => {
      console.log(res);
      if (res['isSuccess'] === false) {
        this.error = res['message'];
        swal.fire({
          title: 'Error!',
          text: this.error,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      } else if(res['isSuccess'] === true) {
        swal.fire({
          icon: 'success',
          title: 'Shipment is closed successfully',
          showConfirmButton: false,
          timer: 1500
        });
      }
      this.getAllOpenShipments(this.userId);
    });
  }

  // logout handler of worker and clear all browser cache
  logoutHandler() {
    this.userService.logout().subscribe(res => {

    }, err => {

    }, () => {
      localStorage.setItem('token', '');
      localStorage.setItem('id', '');
      localStorage.setItem('role', '');
      this.router.navigate(['../login']);
    });
  }

}
