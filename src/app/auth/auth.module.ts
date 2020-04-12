import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import { AlertModule } from 'ngx-bootstrap';
import {GlobalService} from '../shared/services/global.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule.forRoot(),

  ],
  providers: [AuthService, GlobalService]
})
export class AuthModule { }
