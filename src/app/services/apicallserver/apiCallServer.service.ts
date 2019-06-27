import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

let apiUrl = 'http://localhost/api/api.php';
let retriveUrl = 'http://localhost/api/retrive.php';

@Injectable()
export class apiCallServer {

  constructor(public http: Http) {
    console.log('Hello AuthService Provider');
  }

  postData(data) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http.post(apiUrl, data, { headers: headers })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });

  }

  getData(data) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http.get(retriveUrl, data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });

  }

}