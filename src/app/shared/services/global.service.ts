import { Injectable, EventEmitter } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public selectedUserChange = new EventEmitter();
  public isCaptchaNecessary: BehaviorSubject<any> = new BehaviorSubject(false);


  constructor() { }
  setCaptchaToNecessary(val): void {
    this.isCaptchaNecessary.next(val);
  }
}
