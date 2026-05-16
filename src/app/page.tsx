"use client";

import { useAuth } from '@/lib';
import { ROUTES } from '@/lib/routes';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      router.push(isAuthenticated ? ROUTES.home : ROUTES.login);
    }
  }, [isAuthenticated, isLoading, router]);

  return <div>Loading...</div>;
}
