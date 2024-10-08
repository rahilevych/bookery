export type Book = {
  _id: string;
  isbn13: number;
  isbn10: string;
  title: string;
  subtitle: string;
  authors: string;
  categories: string;
  thumbnail: string;
  description: string;
  published_year: number;
  average_rating: number;
  num_pages: number;
  ratings_count: number;
  comments: [string];
  price: number;
};
export type User = {
  _id: string;
  email: string;
  password: string;
  username: string;
  name: string;
  surname: string;
  dateOfBirth: Date;
  country: string;
  city: string;
  postcode: number;
  avatar: string;
  createdAt: Date;
  likedBooks: [string];
  boughtBooks: [];
  orders: [];
};
export type Order = {
  _id: string;
  user_id: string;
  book_list: string[];
  country: string;
  city: string;
  postcode: number;
  address: string;
  totalPrice: number;
  createdAt: Date;
  status: string;
};
export type Cart = {
  _id: string;
  user_id: string;
  items_list: CartItem[];
  price: number;
  status: string;
  createdAt: Date;
};
export type CartItem = {
  bookId: Book;
  amount: number;
};
