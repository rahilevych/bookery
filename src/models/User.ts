import mongoose, { Schema, model } from 'mongoose';
export interface UserDocument {
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
  likedBooks: mongoose.Schema.Types.ObjectId[];
  boughtBooks: [];
  orders: [];
}

const UserSchema = new Schema<UserDocument>({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Email is invalid',
    ],
  },
  password: {
    type: String,
    unique: false,
    required: [true, 'Password is required'],
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required'],
  },
  name: {
    type: String,
    unique: false,
    required: false,
  },
  surname: {
    type: String,
    unique: false,
    required: false,
  },

  dateOfBirth: {
    type: Date,
    unique: false,
    required: false,
  },
  country: {
    type: String,
    unique: false,
    required: false,
  },
  city: {
    type: String,
    unique: false,
    required: false,
  },
  postcode: {
    type: Number,
    unique: false,
    required: false,
  },

  avatar: {
    type: String,
    unique: false,
    required: false,
  },
  createdAt: {
    type: Date,
    unique: false,
    required: true,
    default: Date.now,
  },
  likedBooks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      unique: true,
    },
  ],
  boughtBooks: {
    type: [String],
    unique: false,
    required: false,
  },
  orders: {
    type: [String],
    unique: false,
    required: false,
  },
});
const User = mongoose.models?.User || model<UserDocument>('User', UserSchema);
export default User;
