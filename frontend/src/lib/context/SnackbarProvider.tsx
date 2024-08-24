// https://dev.to/tchassi_jordan/how-to-create-a-snackbar-with-nextjs-20i5
'use client';

import Snackbar from '@/components/Snackbar';
import { SnackbarType } from '@/components/types';
import { createContext, useReducer, useContext, useCallback } from 'react';
import { TAction } from '../utils/reducer';
import reducer from '../utils/reducer';

const SnackbarContext = createContext<{
  queue: SnackbarType[];
  dispatch: React.Dispatch<TAction>;
}>({
  queue: [] as SnackbarType[],
  dispatch: () => {},
});

export default function SnackbarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [{ queue }, dispatch] = useReducer(reducer, { queue: [] });

  return (
    <SnackbarContext.Provider value={{ queue, dispatch }}>
      {queue.map((snack, index) => (
        <Snackbar
          key={snack.key}
          className={`-mt-${index + 1} left-${index + 4}`}
          text={snack.text}
          variant={snack.variant}
          icon={snack.icon}
          handleClose={() =>
            dispatch({ type: 'REMOVE_SNACKBAR', payload: { key: snack.key } })
          }
          open
        />
      ))}
      {children}
    </SnackbarContext.Provider>
  );
}

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar was called outside SnackbarProvider');
  }
  const { dispatch } = context;

  return useCallback(
    (snack: SnackbarType) => {
      dispatch({ type: 'ADD_SNACKBAR', payload: { current: snack } });
    },
    [dispatch]
  );
};
