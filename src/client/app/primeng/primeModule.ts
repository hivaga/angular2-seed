import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeComponent } from './primeComponent';
import { DataTableModule, ButtonModule } from 'primeng/primeng';

@NgModule({
  imports: [CommonModule, DataTableModule, ButtonModule],
  declarations: [PrimeComponent],
  exports: [],
  providers: []
})
export class PrimeModule { }
