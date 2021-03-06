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
    return this.apollo.mutate({
      mutation: this.createPropertyMutation,
      refetchQueries: [
        {
          query: this.getPropertiesQuery
        }
      ],
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
