'use server';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/lib/mongodb';
import Book from '@/models/Book';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, res: NextApiResponse) {
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get('page');
  const size = searchParams.get('size');
  console.log('searchParams>>>>', searchParams);
  try {
    await connectDB();
    const pageNumber = parseInt(page as string, 10) || 1;
    const amountBooksPage = parseInt(size as string, 10) || 20;
    const books = await Book.find({})
      .skip(pageNumber * amountBooksPage)
      .limit(amountBooksPage);
    return Response.json({ books: books });
  } catch (error) {
    console.error('Error by getting list of books', error);
    return Response.json({ error: 'Server error' });
  }
}
