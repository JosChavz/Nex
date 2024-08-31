'use client';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { NexContext } from '@/lib/context/NexProvider';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { currentUser } = useContext(NexContext);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push('/dashboard');
    }
  }, [currentUser, router]);

  return <>{children}</>;
}
