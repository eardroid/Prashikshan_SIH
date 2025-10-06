import '@/styles/globals.css';
import '@/styles/motion.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { LowDataModeProvider } from '@/context/LowDataModeContext';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LowDataModeProvider>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </LowDataModeProvider>
  );
}
