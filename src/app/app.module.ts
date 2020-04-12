import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AppUrl} from './shared/constants/app-url';
import {HttpClientModule} from '@angular/common/http';
import {GlobalService} from './shared/services/global.service';
import {AuthModule} from "./auth/auth.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {InterceptorService} from "./shared/services/interceptor.service";
import {AuthGuard} from "./shared/guards/auth-guard/auth-guard.service";
import {CoreModule} from "./core/core.module";

@NgModule({
  declarations: [
    AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    AuthModule

  ],
  providers: [AppUrl,
    HttpClientModule,
    GlobalService,
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
