import mongoose, { Schema, model } from 'mongoose';

import Comment from '@/models/Comment';
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
  likes: mongoose.Schema.Types.ObjectId[];
  comments: mongoose.Schema.Types.ObjectId[];
  price: number;
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
    required: false,
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
  price: {
    type: Number,
    unique: false,
    required: true,
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
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Сomment',
    },
  ],
});
const Book = mongoose.models?.Book || model<BookDocument>('Book', BookSchema);
export default Book;
