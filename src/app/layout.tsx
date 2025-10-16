import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Seattle Tech Insights',
  description: 'Tracking the pulse of Seattle\'s tech industry',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}