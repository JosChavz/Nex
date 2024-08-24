// app/providers.tsx
'use client';

import { NextUIProvider } from '@nextui-org/react';
import NavBar from '../components/NavigationBar/NavBar';
import SnackbarProvider from '@/lib/context/SnackbarProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <SnackbarProvider>
        <NavBar />
        {children}
      </SnackbarProvider>
    </NextUIProvider>
  );
}
