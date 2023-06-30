import './globals.css';
import { Orbitron } from 'next/font/google';
import { Rajdhani } from 'next/font/google';

import Login from '@/components/Login';
import ClientProvider from '@/components/ClientProvider';

const orbitron = Orbitron({ subsets: ['latin'] });
const rajdhani = Rajdhani({ subsets: ['latin'], weight: ['400'] });

import SessionProvider from '@/components/SessionProvider';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/pages/api/auth/[...nextAuth]';

export const metadata = {
  title: 'STORIES.GPT',
  description: 'stories.gpt',
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={rajdhani.className}>
        {!session ? (
          <Login />
        ) : (
          // <div>
          <SessionProvider session={session}>
            {children}
            <ClientProvider />
          </SessionProvider>
          // </div>
        )}
      </body>
    </html>
  );
}
