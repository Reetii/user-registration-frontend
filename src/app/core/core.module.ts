import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsComponent } from './alerts/alerts.component';
import { AlertModule } from 'ngx-bootstrap';



@NgModule({
  declarations: [AlertsComponent],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
