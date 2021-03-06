export enum Color {
  BLUE = 'blue',
  RED = 'red',
  GREEN = 'green',
}

export enum Role {
  ADMIN = 'admin',
  EDITOR = 'editor',
  SUBSCRIBER = 'subscriber',
}

export enum Status {
  TODO = 'todo',
  DONE = 'done',
}

export enum Category {
  URGENT = 'urgent',
  DEFAULT = 'default',
}

export interface Task {
  id?: string;
  name: string;
  description: string;
  userId: string;
  creation_date: string;
  status: Status;
  category: Category;
}
export interface User {
  id?: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  token?: string;
}
