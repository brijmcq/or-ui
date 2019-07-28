import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Property } from '../shared/property.model';

interface Response {
  properties: Property[];
}

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  constructor(private apollo: Apollo) {}

  getPropertiesQuery = gql`
    {
      properties {
        street
        id
        state
        city
        state
        zip
        rent
        owner {
          firstName
          lastName
        }
      }
    }
  `;

  submitComment = gql`
    mutation submitComment($repoFullName: String!, $commentContent: String!) {
      submitComment(
        repoFullName: $repoFullName
        commentContent: $commentContent
      ) {
        postedBy {
          login
          html_url
        }
        createdAt
        content
      }
    }
  `;

  createPropertyMutation = gql`
    mutation createProperty(
      $street: String!
      $city: String!
      $state: String!
      $zip: String!
      $rent: Float
      $owner: String!
    ) {
      createProperty(
        data: {
          street: $street
          city: $city
          state: $state
          zip: $zip
          rent: $rent
          owner: $owner
        }
      ) {
        id
        street
        city
        state
        zip
        rent
      }
    }
  `;
  getProperties() {
    return this.apollo.watchQuery<Response>({
      query: this.getPropertiesQuery
    }).valueChanges;
  }
  createProperty(
    street: string,
    city: string,
    state: string,
    zip: string,
    rent: number,
    owner: string
  ) {
    console.log('dito na #', street);
    console.log('dito na #', city);
    console.log('dito na #', state);
    console.log('dito na #', zip);
    return this.apollo.mutate({
      mutation: this.createPropertyMutation,
      variables: {
        street,
        city,
        state,
        zip,
        rent,
        owner
      }
    });
  }
}
