import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchPageComponent } from './containers/search-page/search-page.component';
import { UserDashboardComponent } from './containers/user-dashboard/user-dashboard.component';

const routes: Routes = [
  { path: '', component: SearchPageComponent},
  { path: 'users', component: UserDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
