import { connectDB } from '@/lib/mongodb';
import Book from '@/models/Book';
import { Cart } from '@/models/Cart';
import User from '@/models/User';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
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

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    const isInCart = cart.items.some(
      (item: { bookId: string }) => item.bookId.toString() === bookId
    );
  
    return NextResponse.json({ isInCart: isInCart }, { status: 200 });
  } catch (error) {
    console.error('Error in GET handler:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
