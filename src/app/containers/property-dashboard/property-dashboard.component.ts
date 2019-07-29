import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PropertyService } from 'src/app/services/property.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-property-dashboard',
  templateUrl: './property-dashboard.component.html',
  styleUrls: ['./property-dashboard.component.scss']
})
export class PropertyDashboardComponent implements OnInit, OnDestroy {
  constructor(
    private propertyService: PropertyService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  displayedColumns: string[] = [
    'street',
    'city',
    'state',
    'zip',
    'rent',
    // 'user'
  ];
  dataSource = new MatTableDataSource();
  @ViewChild('formDirective', { static: false }) private formDirective: NgForm;
  formGroup: FormGroup;
  propertiesSub: Subscription;
  usersSub: Subscription;
  users$: any;

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      street: [null, [Validators.required]],
      city: [null, Validators.required],
      state: [null, Validators.required],
      zip: [null, Validators.required],
      rent: [null, Validators.required],
      user: [null, Validators.required]
    });
    this.propertiesSub = this.propertyService
      .getProperties()
      .subscribe(({ data }) => {
        this.dataSource.data = data.properties;
      });
    this.users$ = this.userService.getUsers();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onSubmit(form: FormGroup) {

    if (form.valid) {
      const street = form.value.street;
      const city = form.value.city;
      const state = form.value.state;
      const zip = form.value.zip;
      const rent = form.value.rent;
      const user = form.value.user.id;
      this.propertyService
        .createProperty(street, city, state, zip, rent, user)
        .subscribe(response => {
          this.formDirective.resetForm();
          this.snackBar.open('Property added', 'OK', {
            duration: 3000
          });
        });
    }
  }
  displayOwner(user?: User): string | undefined {
    return user ? `${user.firstName} ${user.lastName}` : undefined;
  }
  ngOnDestroy() {
    this.propertiesSub.unsubscribe();
  }
}
