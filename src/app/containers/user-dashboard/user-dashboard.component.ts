import { Component, OnInit } from '@angular/core';
import { User } from 'src/shared/user.model';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  ELEMENT_DATA: User[] = [
    { id: 'a', firstName: 'Hydrogen', lastName: 'Test' },
    { id: 'a', firstName: 'Helium', lastName: 'user2' },
    { id: 'a', firstName: 'Lithium', lastName: 'user33aaa' }
  ];
  constructor() {}
  displayedColumns: string[] = ['firstName', 'lastName'];
  dataSource =  new MatTableDataSource(this.ELEMENT_DATA);
  ngOnInit() {}
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
