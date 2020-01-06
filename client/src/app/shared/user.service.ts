import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:3001/api/user/';

  constructor(private http: HttpClient) {
  }

  registerWorker(worker) {
    return this.http.post(this.baseUrl + 'registerWorker', worker);
  }

  getAllWorker() {
    return this.http.get(this.baseUrl + 'getAllWorker');
  }

  deleteWorker(id: any) {
    return this.http.post(this.baseUrl + `deleteWorker` , {id});
  }

  login(email: string, password: string) {
    return this.http.post(this.baseUrl + 'login', {email, password});
  }

}
