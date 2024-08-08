import { connectDB } from '@/lib/mongodb';
import Book from '@/models/Book';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get('query');

  console.log('searchParams>>>>', searchParams);
  try {
    await connectDB();
    // const input = parseInt(query as string, 10) || '';
    const input = {
      $or: [
        { authors: query },
        { title: query },
        { categories: query },
        { subtitle: query },
      ],
    };
    const books = await Book.find(input);

    return Response.json({ books: books });
  } catch (error) {
    console.error('Error by getting list of books', error);
    return Response.json({ error: 'Server error' });
  }
}
