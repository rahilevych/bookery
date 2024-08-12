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
};
