import { useState, useEffect } from "react";

export default function useSessionStorage(flag) {
  const [storage, setStorage] = useState(null);

  const SESSION_KEY = 'firebase:authUser:AIzaSyADlKhrdNpry8rQYG1AbM7Qg7wUh9KmDbg:[DEFAULT]';

  useEffect(() => {
    setStorage(JSON.parse(window.sessionStorage.getItem(SESSION_KEY)));
  }, [flag])

  return storage
}