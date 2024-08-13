import mongoose, { Schema, model } from 'mongoose';
export interface OrderDocument {
  _id: mongoose.Schema.Types.ObjectId;
  user_id: mongoose.Schema.Types.ObjectId;
  book_list: mongoose.Schema.Types.ObjectId[];
  country: string;
  city: string;
  postcode: number;
  address: string;
  totalPrice: number;
  createdAt: Date;
}

const OrderSchema = new Schema<OrderDocument>({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  book_list: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
      unique: true,
    },
  ],
  country: {
    type: String,
    unique: false,
    required: [true, 'Text is required'],
  },
  city: {
    type: String,
    unique: false,
    required: [true, 'Text is required'],
  },
  address: {
    type: String,
    unique: false,
    required: [true, 'Text is required'],
  },
  postcode: {
    type: Number,
    unique: false,
    required: [true, 'Text is required'],
  },

  totalPrice: {
    type: Number,
    unique: false,
    required: [true, 'Text is required'],
  },

  createdAt: {
    type: Date,
    unique: false,
    required: true,
    default: Date.now,
  },
});
const Order =
  mongoose.models?.Order || model<OrderDocument>('Order', OrderSchema);
export default Order;
