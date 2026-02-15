import './globals.css';
import { Inter } from 'next/font/google';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import TanStackProvider from '../components/TanStackProvider/TanStackProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'NoteHub',
  description: 'Manage your personal notes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Додаємо suppressHydrationWarning сюди 👇
    <html lang="en" suppressHydrationWarning={true}>
      {/* І він має залишитися тут 👇 */}
      <body className={inter.className} suppressHydrationWarning={true}>
        <TanStackProvider>
          <Header />
          {children}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}