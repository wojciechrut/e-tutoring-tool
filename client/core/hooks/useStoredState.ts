import { useState } from "react";

export const useStoredState = <T extends string>(
  key: string,
  defaultValue: T | null
) => {
  const storedState = localStorage.getItem(key) as T | null;
  const initialState = storedState || defaultValue;

  const [state, setState] = useState<T | null>(initialState);

  const setStoredState = (newState: T) => {
    localStorage.setItem(key, newState);
    setState(newState);
  };

  return [state, setStoredState] as const;
};
