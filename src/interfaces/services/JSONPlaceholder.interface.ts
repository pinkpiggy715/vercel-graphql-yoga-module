export type Post = {
  body: string;
  id: number;
  title: string;
  userId: number;
};

export type Address = {
  city: string;
  geo: Geo;
  street: string;
  suite: string;
  zipcode: string;
};

export type Geo = {
  lat: string;
  lng: string;
};

export type Company = {
  bs: string;
  catchPhrase: string;
  name: string;
};

export type getPostByPostIdResponse = Post;

export type getPostByUserIdResponse = Post[];

export type getUserByUserIdResponse = {
  address: Address;
  company: Company;
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
};
