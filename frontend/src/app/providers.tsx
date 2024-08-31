// app/providers.tsx
'use client';

import { NextUIProvider } from '@nextui-org/react';
import NavBar from '../components/NavigationBar/NavBar';
import SnackbarProvider from '@/lib/context/SnackbarProvider';
import NexProvider from '@/lib/context/NexProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <SnackbarProvider>
        <NexProvider>
          <NavBar />
          {children}
        </NexProvider>
      </SnackbarProvider>
    </NextUIProvider>
  );
}
