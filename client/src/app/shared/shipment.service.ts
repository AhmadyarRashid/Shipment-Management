import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  baseUrl = 'http://localhost:3002/api/shipment/';
  token: string;
  header: any;
  option: any;

  constructor(private http: HttpClient) {
    this.setHttpHeader();
  }

  setHttpHeader() {
    this.token = localStorage.getItem('token');
    this.header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + this.token
    });
    this.option = {headers: this.header};
  }

  getAllShipments() {
    return this.http.get(this.baseUrl + 'getAllShipments' , this.option);
  }

  addShipment(name, description) {
    return this.http.post(this.baseUrl + 'addShipment', {name, description}, this.option);
  }

  assignWorkers(id, workerList) {
    return this.http.post(this.baseUrl + 'assignWorkers', {id, workerList}, this.option);
  }

  deleteShipment(id) {
    return this.http.post(this.baseUrl + 'deleteShipment', {id}, this.option);
  }

  getAllShipmentsByUserId(id) {
    return this.http.get(this.baseUrl + `getAllShipmentsByUserId/${id}`, this.option);
  }

  updateShipmentStatus(id, status: boolean) {
    return this.http.post(this.baseUrl + 'updateShipmentStatus', {id, status}, this.option);
  }
}
