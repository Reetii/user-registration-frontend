import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {AuthGuard} from "./shared/guards/auth-guard/auth-guard.service";
import {LoginComponent} from "./auth/login/login.component";

const routes: Routes = [


 {
    path: 'login',
    component: LoginComponent,

  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
