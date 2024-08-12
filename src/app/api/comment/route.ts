import { connectDB } from '@/lib/mongodb';
import Book from '@/models/Book';
import Comment from '@/models/Comment';
import { User } from '@phosphor-icons/react';
import { getToken } from 'next-auth/jwt';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const bookId = searchParams.get('bookId');

    if (!bookId) {
      return NextResponse.json({ error: 'Missing bookId' }, { status: 400 });
    }
    const comments = await Comment.find({ book_id: bookId }).exec();
    return NextResponse.json({ comments: comments });
  } catch (error) {
    console.error('Error by getting comments:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const bookId = searchParams.get('bookId');
    const userId = searchParams.get('userId');
    console.log('user id>>>>' + userId);
    const body = await req.json();
    console.log('user id>>>>' + userId);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const newComment = {
      user_id: userId,
      book_id: bookId,
      text: body.text,
    };

    const comment = await Comment.create(newComment);
    await Book.findByIdAndUpdate(bookId, { $push: { comments: comment._id } });
    return NextResponse.json({ comment });
  } catch (error) {
    console.error('Error by adding comment:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const commentId = searchParams.get('commentId');
    const bookId = searchParams.get('bookId');
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }
    if (comment.user_id.toString() !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    await comment.deleteOne();

    await Book.findByIdAndUpdate(bookId, {
      $pull: { comments: comment._id },
    });

    return NextResponse.json({ comment });
  } catch (error) {
    console.error('Error by deleting comment:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
