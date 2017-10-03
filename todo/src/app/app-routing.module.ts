import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layouts/default/default-layout.component';

const routes: Routes = [
  {
    path:      '',
    component: DefaultLayoutComponent,
    children:  [
      {
        path:         '',
        loadChildren: './dash/dash.module#DashModule'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
