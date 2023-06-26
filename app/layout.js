import './globals.css';
import { Orbitron } from 'next/font/google';
import { Rajdhani } from 'next/font/google';

const orbitron = Orbitron({ subsets: ['latin'] });
const rajdhani = Rajdhani({ subsets: ['latin'], weight: ['400'] });

export const metadata = {
  title: 'STORIES.GPT',
  description: 'stories.gpt',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={rajdhani.className}>{children}</body>
    </html>
  );
}
