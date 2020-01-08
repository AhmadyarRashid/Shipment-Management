import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:3002/api/user/';
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
      'Authorization': 'Token ' + localStorage.getItem('token')
    });
    this.option = {headers: this.header};
  }

  registerWorker(worker) {
    this.setHttpHeader()
    return this.http.post(this.baseUrl + 'registerWorker', worker, this.option);
  }

  getAllWorker() {
    this.setHttpHeader()
    return this.http.get(this.baseUrl + 'getAllWorker', this.option);
  }

  deleteWorker(id: any) {
    this.setHttpHeader()
    return this.http.post(this.baseUrl + `deleteWorker`, {id}, this.option);
  }

  login(email: string, password: string) {
    return this.http.post(this.baseUrl + 'login', {email, password});
  }

  logout() {
    this.setHttpHeader()
    return this.http.post(this.baseUrl + 'logout', {
      token: localStorage.getItem('token'),
      id: localStorage.getItem('id')
    }, this.option);
  }

}
