'use server';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/lib/mongodb';
import Book from '@/models/Book';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, res: NextApiResponse) {
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get('page');
  const size = searchParams.get('size');
  const query = searchParams.get('query');
  try {
    let input = {};
    if (query) {
      const regex = new RegExp(query, 'i');
      input = {
        $or: [
          { authors: regex },
          { title: regex },
          { categories: regex },
          { subtitle: regex },
        ],
      };
    }

    await connectDB();
    const pageNumber = parseInt(page as string, 10) || 1;
    const amountBooksPage = parseInt(size as string, 10) || 20;
    const books = await Book.find(input)
      .skip((pageNumber - 1) * amountBooksPage)
      .limit(amountBooksPage);

    return new Response(JSON.stringify({ books }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error by getting list of books', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
