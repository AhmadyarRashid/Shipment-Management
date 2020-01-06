import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MatDialog} from '@angular/material';
import {ShipmentService} from '../../shared/shipment.service';

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

  displayedColumns: string[] = ['id', 'name', 'description', 'action'];
  shipments = [];
  dataSource: MatTableDataSource<ShipmentSchema>;
  userId: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dialog: MatDialog, private shipmentService: ShipmentService) {
    this.dataSource = new MatTableDataSource(this.shipments);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.userId = '5e1388bb370c916638ab9200';
    this.getAllOpenShipments(this.userId);
  }

  getAllOpenShipments(id) {
    this.shipmentService.getAllShipmentsByUserId(id).subscribe(res => {
      this.dataSource.data = res['data'];
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  handlerDelete(id) {
    this.shipmentService.updateShipmentStatus(id, false).subscribe(res => {
      this.getAllOpenShipments(this.userId);
    });
  }

}
