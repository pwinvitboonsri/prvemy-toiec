'use client';

import { useRouter } from 'next/navigation';

export function useRedirect() {
  const router = useRouter();

  return (to?: string, delayMs = 0) => {
    const target = to ?? '/';

    if (delayMs > 0) {
      const timer = setTimeout(() => {
        router.push(target);
      }, delayMs);

      return () => clearTimeout(timer);
    }

    router.push(target);
    return undefined;
  };
}
