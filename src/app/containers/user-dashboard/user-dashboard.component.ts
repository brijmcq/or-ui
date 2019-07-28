import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}
  displayedColumns: string[] = ['firstName', 'lastName'];
  dataSource = new MatTableDataSource();
  @ViewChild('formDirective', { static: false }) private formDirective: NgForm;
  formGroup: FormGroup;

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      firstName: [null, [Validators.required, Validators.required]],
      lastName: [null, Validators.required]
    });

    this.userService.getUsers().subscribe(({ data }) => {
      this.dataSource.data = data.users;
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onSubmit(form: FormGroup) {
    if (form.valid) {
      const firstName = form.value.firstName;
      const lastName = form.value.lastName;
      this.userService.createUser(firstName, lastName).subscribe( success => {
        this.snackBar.open(`${firstName} ${lastName} added`, 'OK', {
          duration: 3000
        });
        this.formDirective.resetForm();
      });
    }
  }
}
