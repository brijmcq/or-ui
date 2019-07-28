import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchPageComponent } from './containers/search-page/search-page.component';
import { UserDashboardComponent } from './containers/user-dashboard/user-dashboard.component';
import { PropertyDashboardComponent } from './containers/property-dashboard/property-dashboard.component';

const routes: Routes = [
  { path: '', component: SearchPageComponent },
  { path: 'users', component: UserDashboardComponent },
  { path: 'properties', component: PropertyDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
