import mongoose, { Schema, model } from 'mongoose';
export interface CommentDocument {
  _id: mongoose.Schema.Types.ObjectId;
  user_id: mongoose.Schema.Types.ObjectId;
  book_id: mongoose.Schema.Types.ObjectId;
  text: string;
  createdAt: Date;
}

const CommentSchema = new Schema<CommentDocument>({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  book_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  text: {
    type: String,
    unique: false,
    required: [false, 'Text is required'],
  },

  createdAt: {
    type: Date,
    unique: false,
    required: true,
    default: Date.now,
  },
});
const Comment =
  mongoose.models?.Comment || model<CommentDocument>('Comment', CommentSchema);
export default Comment;
