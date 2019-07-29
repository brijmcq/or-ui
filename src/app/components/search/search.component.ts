import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { switchMap, debounceTime, tap, finalize, distinctUntilChanged } from 'rxjs/operators';
import { SearchService } from 'src/app/services/search.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  users: any;
  properties: any;
  searchResult$: Observable<any>;

  isLoading: boolean;
  isSearchResultLoading = false;
  constructor(private fb: FormBuilder, private searchService: SearchService) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      searchInput: null
    });
    this.searchForm
      .get('searchInput')
      .valueChanges.pipe(
        debounceTime(200),
        tap(() => (this.isLoading = true)),
        switchMap(val => {
          return this.searchService
            .getSearch(val, 5)
            .pipe(finalize(() => (this.isLoading = false)));
        })
      )
      .subscribe(result => {
        this.users = result.data;
        this.properties = result.data;
        this.isLoading = false;
      });
  }
  onSubmit(form: FormGroup) {
    if (form.valid) {
      console.log('searching', form.value);
      this.isSearchResultLoading = true;
      this.searchResult$ = this.searchService.getSearch(form.value.searchInput || '')
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap( () => this.isSearchResultLoading = false ));
    }
  }
}
