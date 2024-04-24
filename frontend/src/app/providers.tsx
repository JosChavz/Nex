// app/providers.tsx
'use client';

import { NextUIProvider } from '@nextui-org/react';
import NavBar from '../components/NavigationBar/NavBar';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NavBar />
      {children}
    </NextUIProvider>
  );
}
