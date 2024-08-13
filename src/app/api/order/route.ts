import { connectDB } from '@/lib/mongodb';
import Book from '@/models/Book';
import Order from '@/models/Order';
import User from '@/models/User';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: Request, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get('orderId');
  console.log('searchParams>>>>', orderId);
  try {
    await connectDB();

    const order = await Order.findById(orderId);
    console.log(order);
    return Response.json({ order: order });
  } catch (error) {
    console.error('Error by getting order', error);
    return Response.json({ error: 'Server error' });
  }
}
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    console.log('user id>>>>' + userId);
    const body = await req.json();
    console.log('user id>>>>' + userId);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const newOrder = {
      user_id: userId,
      book_list: body.book_list,
      country: body.country,
      city: body.city,
      postcode: body.postcode,
      address: body.address,
      totalPrice: body.totalPrice,
    };
    //   const newOrder = {
    //     user_id: userId,
    //     book_id: bookId,
    //     text: body.text,
    //   };

    const order = await Order.create(newOrder);
    await Book.findByIdAndUpdate(userId, { $push: { orders: order._id } });
    return NextResponse.json({ order });
  } catch (error) {
    console.error('Error by creating order:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    console.log('body avatar>>>>>>' + body.avatar);

    const order = await Order.findByIdAndUpdate(orderId, body);

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ order: order });
  } catch (error) {
    console.error('Error while updating order:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const orderId = searchParams.get('orderId');
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }
    if (order.user_id.toString() !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    await order.deleteOne();

    await User.findByIdAndUpdate(orderId, {
      $pull: { orders: order._id },
    });

    return NextResponse.json({ order });
  } catch (error) {
    console.error('Error by deleting comment:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
