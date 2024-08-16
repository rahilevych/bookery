import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Provider } from './provider';
import { BooksWrapper } from '@/context/BookContext';
import { CartWrapper } from '@/context/CartContext';
import Navbar from '@/components/Navbar';

import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bookery',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <Provider>
        <BooksWrapper>
          <CartWrapper>
            {' '}
            <body className={inter.className}>
              <Navbar />
              {children}
              <Toaster position='top-center' />
            </body>
          </CartWrapper>
        </BooksWrapper>
      </Provider>
    </html>
  );
}
