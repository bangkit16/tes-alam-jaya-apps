import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Jalankan timer untuk mengupdate debouncedValue setelah delay (ms)
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Bersihkan timer jika value atau delay berubah sebelum delay selesai
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
