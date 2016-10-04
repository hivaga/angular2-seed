import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { PrimeModule } from './primeng/primeModule';

@NgModule({
  imports: [PrimeModule, BrowserModule, HttpModule, RouterModule.forRoot(routes), AboutModule, HomeModule, SharedModule.forRoot()],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  },
  {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]

})

export class AppModule { }
