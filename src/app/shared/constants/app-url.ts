import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';

@Injectable()
export class AppUrl {

  constructor() {
  }

  public get APP_URL_V1(): string {
    return environment.appUrl + 'api/v1/';
  }
  public EXPENSES(): string {
    return this.APP_URL_V1 + 'expenses';
  }
  public EXPENSE_BY_ID(id): string {
    return this.APP_URL_V1 + 'expenses/' + id;
  }
  public LOGIN(): string {
    return this.APP_URL_V1 + 'auth/login';
  }
  public REGISTER(): string {
    return this.APP_URL_V1 + 'auth/register';
  }
}

