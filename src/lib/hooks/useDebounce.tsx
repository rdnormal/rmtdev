import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay = 500):T {
  const [debouncedValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timeId = setTimeout(() => {
      setDebounceValue(value)
    }, delay);
    return () => clearTimeout(timeId)
  },[value, delay])

  return debouncedValue;
}
