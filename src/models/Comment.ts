import mongoose, { Schema, model } from 'mongoose';
export interface CommentDocument {
  _id: string;
  user_id: string;
  book_id: string;
  text: string;

  createdAt: Date;
}

const CommentSchema = new Schema<CommentDocument>({
  user_id: {
    type: String,
    unique: false,
    required: false,
  },
  book_id: {
    type: String,
    unique: false,
    required: false,
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
