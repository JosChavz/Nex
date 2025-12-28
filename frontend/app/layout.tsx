import type { Metadata } from "next";
import "./globals.css";
import {AppThemeProvider} from "@/app/providers/AppThemeProvider";
import Header from "@/app/components/header/Header";

export const metadata: Metadata = {
  title: 'Acme Dashboard',
  description: 'The official Next.js Course Dashboard, built with App Router.',
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body
          suppressHydrationWarning
          className={`antialiased`}
      >
      <AppThemeProvider>
        <Header />
        {children}
      </AppThemeProvider>
      </body>
      </html>
  );
}
