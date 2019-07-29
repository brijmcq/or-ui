import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { User } from '../shared/user.model';

type Response = {
  users: User[];
};
const searchQuery = gql`
  query search($query: String!, $first: Int) {
    search(query: $query, first: $first) {
      users {
        id
        firstName
        lastName
      }
      properties {
        id
        street
        id
        state
        city
        state
        zip
        rent
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private apollo: Apollo) {}

  getSearch(query = '', first?: number) {
    return this.apollo.watchQuery<Response>({
      query: searchQuery,
      variables: {
        query,
        first
      }
    }).valueChanges;
  }
}
