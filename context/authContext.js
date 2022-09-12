import React, { useState, useMemo, useContext } from 'react';
import useSessionStorage from '../hook/useSessionStorage';
import FIREBASE_AUTH from '../lib/firebase/auth';

const AuthContext = React.createContext();
const AuthAction = React.createContext();

export default function AuthContextProvider({ children }) {
  // Local-State 변경하기 위함.
  const [flag, setFlag] = useState();
  const storage = useSessionStorage(flag);

  const actions = useMemo(
    () => ({
      async signIn() {
        await FIREBASE_AUTH.firebaseSignIn();
        setFlag(true);
      },
      async signOut() {
        await FIREBASE_AUTH.firebaseSignOut();
        setFlag(false);
      }
    }),
    []
  );

  return (
    <AuthAction.Provider value={actions}>
      <AuthContext.Provider value={storage}>
        {children}
      </AuthContext.Provider>
    </AuthAction.Provider>
  )
}

export function useAuthContext() {
  const storage = useContext(AuthContext);

  if (storage === undefined) {
    throw new Error('Auth Context is undefined');
  }

  return storage;
}

export function useAuthActions() {
  const actions = useContext(AuthAction);

  if (actions === undefined) {
    throw new Error('Auth Action is undefined');
  }

  return actions;
}