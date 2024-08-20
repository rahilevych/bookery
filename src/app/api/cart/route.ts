import { connectDB } from '@/lib/mongodb';
import { Cart } from '@/models/Cart';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  try {
    await connectDB();
    const cart = await Cart.findOne({ userId }).populate('items.bookId');

    if (!cart) {
      return NextResponse.json({ items: [] });
    }

    return NextResponse.json({ items: cart.items });
  } catch (error) {
    console.error('Error fetching cart', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const bookId = searchParams.get('bookId');
    const amount = parseInt(searchParams.get('amount') || '1', 10);

    if (!userId || !bookId) {
      return NextResponse.json(
        { error: 'Missing userId or bookId' },
        { status: 400 }
      );
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ bookId, amount }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item: any) => item.bookId.toString() === bookId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].amount += amount;
      } else {
        cart.items.push({ bookId, amount });
      }
    }

    await cart.save();

    return NextResponse.json({ cart: cart.items });
  } catch (error) {
    console.error('Error creating/updating cart', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  try {
    await connectDB();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const cart = await Cart.findOneAndDelete({ userId });

    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Cart deleted successfully' });
  } catch (error) {
    console.error('Error deleting cart', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    const body = await req.json();

    if (!userId || !body.items) {
      return NextResponse.json(
        { error: 'Missing userId or items' },
        { status: 400 }
      );
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }
    cart.items = body.items.map((item: any) => ({
      bookId: item.bookId,
      amount: item.amount,
    }));

    await cart.save();

    return NextResponse.json({ cart: cart.items });
  } catch (error) {
    console.error('Error updating cart', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
