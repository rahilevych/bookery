import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Provider } from './provider';
import Navbar from '@/components/Navbar';
import { Toaster } from 'react-hot-toast';
import { AppContextProvider } from '@/context/AppContext';

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
        <AppContextProvider>
          <body className={inter.className}>
            <Navbar />
            {children}
            <Toaster position='top-center' />
          </body>
        </AppContextProvider>
      </Provider>
    </html>
  );
}
