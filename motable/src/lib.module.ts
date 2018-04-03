import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MotableComponent} from './motable.component';
import {DragulaModule} from 'ng2-dragula';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    DragulaModule
  ],
  exports: [MotableComponent],
  declarations: [MotableComponent]
})

export class MotableModule {

}
