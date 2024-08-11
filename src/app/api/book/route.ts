import { connectDB } from '@/lib/mongodb';
import Book from '@/models/Book';
import mongoose from 'mongoose';
import { NextApiRequest } from 'next';
import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';

import { NextRequest, NextResponse } from 'next/server';

type Params = {
  bookId: string;
};

export async function GET(req: Request, res: NextResponse) {
  //const searchParams = req.nextUrl.searchParams;
  //const bookId = searchParams.get('id');
  //console.log(bookId);
  //console.log(req);
  //const bookId = context.params.bookId;

  //console.log('searchParams>>>>', bookId);
  // console.log('req>>>>', req);
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  // const { id } = req.query;
  console.log('searchParams>>>>', id);
  try {
    await connectDB();

    const book = await Book.findById(id);
    console.log(book);
    return Response.json({ book: book });
  } catch (error) {
    console.error('Error by getting book', error);
    return Response.json({ error: 'Server error' });
  }
}
