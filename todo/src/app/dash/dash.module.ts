import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashRoutes } from './dash.routing';
import { DashComponent } from './dash.component';
import { DragulaModule } from 'ng2-dragula';

@NgModule({
  imports:      [
    CommonModule,
    RouterModule.forChild(DashRoutes),
    DragulaModule,
  ],
  declarations: [
    DashComponent,
  ],
  providers:    []
})

export class DashModule {
}
