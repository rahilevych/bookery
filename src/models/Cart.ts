import { Schema, model, models } from 'mongoose';

const cartItemSchema = new Schema({
  bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  amount: { type: Number, required: true, default: 1 },
});

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  totalPrice: { type: Number, default: 0 },
  status: { type: String },
  createdAt: { type: Date, default: Date.now },
  items: [cartItemSchema],
});

export const Cart = models.Cart || model('Cart', cartSchema);
