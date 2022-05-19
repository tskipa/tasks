export enum Color {
  BLUE = 'blue',
  RED = 'red',
  GREEN = 'green',
}

export interface Token {
  access_token: string;
}

export interface User {
  name: string;
  email: string;
  password?: string;
  role: string;
}
