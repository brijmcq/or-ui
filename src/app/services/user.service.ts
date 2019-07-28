import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { User } from '../shared/user.model';



type Response = {
  users: User[];
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  createUserMutation = gql`
    mutation createUser($firstName: String!, $lastName: String!) {
      createUser(data: { firstName: $firstName, lastName: $lastName }) {
        id
        firstName
        lastName
      }
    }
  `;
  getUsersQuery = gql`
    {
      users {
        id
        lastName
        firstName
      }
    }
  `;

  constructor(private apollo: Apollo) {}
  getUsers() {
    return this.apollo.watchQuery<Response>({
      query: this.getUsersQuery
    }).valueChanges;
  }
  createUser(firstName: string, lastName: string) {
    return this.apollo.mutate({
      mutation: this.createUserMutation,
      refetchQueries: [
        {
          query: this.getUsersQuery
        }
      ],
      variables: {
        firstName,
        lastName
      }
    });
  }
}
