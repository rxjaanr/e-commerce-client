import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay: number) {
  const [debouncedVal, setDebouncedVal] = useState(value);
  useEffect(() => {
    if (value !== "") {
      const timeout = setTimeout(() => {
        setDebouncedVal(value);
      }, delay);
      return () => clearTimeout(timeout);
    } else {
      setDebouncedVal(value);
    }
  }, [value]);
  return debouncedVal;
}
