import { connectDB } from '@/lib/mongodb';
import Book from '@/models/Book';
import Comment from '@/models/Comment';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const bookId = searchParams.get('bookId');

    const body = await req.json();

    const newComment = {
      user_id: 'userId',
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
