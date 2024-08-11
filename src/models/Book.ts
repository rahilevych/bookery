import mongoose, { Schema, model } from 'mongoose';
export interface BookDocument {
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
}

const BookSchema = new Schema<BookDocument>({
  // _id: { type: Schema.Types.ObjectId, required: true },
  isbn13: {
    type: Number,
    unique: true,
    required: [true, 'isbn13 is required'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Email is invalid',
    ],
  },
  isbn10: {
    type: String,
    unique: true,
    required: [true, 'isbn10 is required'],
  },
  title: {
    type: String,
    unique: false,
    required: true,
  },
  subtitle: {
    type: String,
    unique: false,
    required: false,
  },
  authors: {
    type: String,
    unique: false,
    required: true,
  },

  categories: {
    type: String,
    unique: false,
    required: false,
  },
  thumbnail: {
    type: String,
    unique: false,
    required: false,
  },
  description: {
    type: String,
    unique: false,
    required: false,
  },
  published_year: {
    type: Number,
    unique: false,
    required: false,
  },

  average_rating: {
    type: Number,
    unique: false,
    required: false,
  },
  num_pages: {
    type: Number,
    unique: false,
    required: false,
  },
  ratings_count: {
    type: Number,
    unique: false,
    required: false,
  },
  comments: {
    type: [String],
  },
});
const Book = mongoose.models?.Book || model<BookDocument>('Book', BookSchema);
export default Book;
