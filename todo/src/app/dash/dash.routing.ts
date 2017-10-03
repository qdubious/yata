import { Routes } from '@angular/router';
import { DashComponent } from './dash.component';

export const DashRoutes: Routes = [ {
  path:      '',
  component: DashComponent,
  data:      {
    heading: 'TODOs'
  }
} ];
