import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:3001/api/user/';
  token: string;
  header: any;
  option: any;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    this.header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + this.token
    });
    this.option = {headers: this.header};
  }

  registerWorker(worker) {
    return this.http.post(this.baseUrl + 'registerWorker', worker, this.option);
  }

  getAllWorker() {
    return this.http.get(this.baseUrl + 'getAllWorker', this.option);
  }

  deleteWorker(id: any) {
    return this.http.post(this.baseUrl + `deleteWorker`, {id} , this.option);
  }

  login(email: string, password: string) {
    return this.http.post(this.baseUrl + 'login', {email, password});
  }

}
