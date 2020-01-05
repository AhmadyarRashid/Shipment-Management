import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ConfirmDialoComponent, ConfirmDialogModel} from '../../confirm-dialo/confirm-dialo.component';
import { MatDialog } from '@angular/material';

export interface ShipmentSchema {
  id: string;
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
  shipments = [
    {id: '1', name: 'laptops', description: '', status: false},
    {id: '2', name: 'bags', description: '', status: false},
    {id: '3', name: 'cars', description: '', status: false},
    {id: '4', name: 'boxes', description: '', status: false},
    {id: '5', name: 'pens', description: '', status: false},
  ];
  dataSource: MatTableDataSource<ShipmentSchema>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

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

  onUpdate() {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel('Confirm Action', message);

    const dialogRef = this.dialog.open(ConfirmDialoComponent, {
      maxWidth: '700px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      // this.result = dialogResult;
      console.log('confirm messgae ---' , dialogResult );
    });
  }

}
