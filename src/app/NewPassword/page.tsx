// app/NewPassword/page.tsx
import { Suspense } from 'react';
import NewPasswordClient from './NewPasswordClient';

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <NewPasswordClient />
    </Suspense>
  );
}