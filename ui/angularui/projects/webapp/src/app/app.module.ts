import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Lib1Module } from '../../../lib1/src/lib/lib1.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, Lib1Module],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
