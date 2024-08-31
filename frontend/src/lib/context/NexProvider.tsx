'use client';

import { createContext, useState } from 'react';
import { AUTH } from '../../../firebase-config';
import { User } from '@firebase/auth';
import { signOut } from 'firebase/auth';

interface NexContextType {
  currentUser: User | null;
  setCurrentUser: (newUser: User) => void;
}

export const NexContext = createContext<NexContextType>({
  currentUser: AUTH.currentUser,
  setCurrentUser: () => {},
});

export default function NexProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  return (
    <NexContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </NexContext.Provider>
  );
}
