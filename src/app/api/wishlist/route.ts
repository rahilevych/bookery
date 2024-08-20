import { connectDB } from '@/lib/mongodb';
import Book from '@/models/Book';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await User.findById(userId).select('likedBooks');

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const likedBooks = user.likedBooks;

    const books = await Book.find({ _id: { $in: likedBooks } });

    return NextResponse.json({ books: books });
  } catch (error) {
    console.error('Error by getting books:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const bookId = searchParams.get('bookId');

    if (!userId || !bookId) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const book = await Book.findById(bookId);
    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    if (!Array.isArray(user.likedBooks) && !Array.isArray(book.likes)) {
      user.likedBooks = [];
      book.likes = [];
    }

    let isLiked =
      user.likedBooks.includes(bookId) && book.likes.includes(userId);

    if (isLiked) {
      user.likedBooks = user.likedBooks.filter(
        (id: any) => id.toString() !== bookId
      );
      book.likes = book.likes.filter((id: any) => id.toString() !== userId);
    } else {
      user.likedBooks.push(bookId);
      book.likes.push(userId);
    }
    await user.save();
    await book.save();
    return NextResponse.json({ isLiked: !isLiked }, { status: 200 });
  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const bookId = searchParams.get('bookId');

    if (!userId || !bookId) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const book = await Book.findById(bookId);
    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    user.likedBooks = user.likedBooks.filter(
      (id: any) => id.toString() !== bookId
    );

    book.likes = book.likes.filter((id: any) => id.toString() !== userId);

    await user.save();
    await book.save();

    return NextResponse.json(
      { message: 'Book removed from wishlist' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in DELETE handler:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
