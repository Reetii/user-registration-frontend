import { Injectable } from '@angular/core';
import {AppUrl} from '../constants/app-url';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private appUrl: AppUrl, private http: HttpClient) {}
  login(data): Observable<any> {
    return this.http.post(this.appUrl.LOGIN(), data).pipe();
  }
  register(data): Observable<any> {
    return this.http.post(this.appUrl.REGISTER(), data).pipe();
  }

}
