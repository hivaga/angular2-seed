import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { NameListService } from '../shared/name-list/index';
import { PrimeDataList } from '../primeng/PrimeDataList';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [HomeComponent, PrimeDataList],
  exports: [HomeComponent],
  providers: [NameListService]
})
export class HomeModule { }
