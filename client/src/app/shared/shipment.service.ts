import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  baseUrl = 'http://localhost:3001/api/shipment/';

  constructor(private http: HttpClient) {
  }

  getAllShipments() {
    return this.http.get(this.baseUrl + 'getAllShipments');
  }

  addShipment(name, description) {
    return this.http.post(this.baseUrl + 'addShipment', {name, description});
  }

  assignWorkers(id, workerList) {
    return this.http.post(this.baseUrl + 'assignWorkers', {id, workerList});
  }

  deleteShipment(id) {
    return this.http.post(this.baseUrl + 'deleteShipment', {id});
  }

  getAllShipmentsByUserId(id) {
    return this.http.get(this.baseUrl + `getAllShipmentsByUserId/${id}`);
  }

  updateShipmentStatus(id, status: boolean) {
    return this.http.post(this.baseUrl + 'updateShipmentStatus', {id, status});
  }
}
