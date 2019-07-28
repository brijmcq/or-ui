import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatTableModule

} from '@angular/material';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchComponent } from './components/search/search.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchPageComponent } from './containers/search-page/search-page.component';
import { UserDashboardComponent } from './containers/user-dashboard/user-dashboard.component';
@NgModule({
  declarations: [AppComponent, NavbarComponent, SearchComponent, FooterComponent, SearchPageComponent, UserDashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
