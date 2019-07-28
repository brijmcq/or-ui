import { User } from './user.model';

export interface Property {
  id: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  rent: number;
  owner: User;
}
