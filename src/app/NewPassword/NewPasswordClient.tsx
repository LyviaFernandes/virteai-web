'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ROUTES } from '@/lib/routes';
import { useAuth, authService } from '@/lib';
import { handleApiError } from '@/utils/apiErrors';
import { validatePassword } from '@/utils/validators';
import './style.css'
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '../../assets/images/return-icon.svg';
import Input from '@/components/input/Input';

export default function NewPasswordClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuth();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push(ROUTES.home);
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const queryToken = searchParams.get('token');
    const storedToken = sessionStorage.getItem('resetToken');

    if (queryToken) {
      setToken(queryToken);
      sessionStorage.setItem('resetToken', queryToken);
    } else if (storedToken) {
      setToken(storedToken);
    }
  }, [searchParams]);

  if (isAuthenticated) {
    return <div>Redirecting...</div>;
  }

  const handleSubmit = async () => {
    setError(null);
    const v = validatePassword(password, 'Nova senha');
    setPasswordError(v);
    if (v) return;

    if (!token) {
      setError('Informe o código de redefinição recebido por email.');
      return;
    }

    try {
      setSubmitting(true);
      await authService.resetPassword({ token, password });
      setSuccess(true);
      sessionStorage.removeItem('resetToken');
      setTimeout(() => router.push(ROUTES.login), 800);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="reset-password">
      <HeaderEnter src={Return} />
      <div className="reset-password__container">
        <h2>Redefina sua Senha</h2>
        <div className="reset-password__card">
          <div className="reset-password__message">
            <p>Insira o código de redefinição enviado por email e sua nova senha:</p>
          </div>

          {error && (
            <div style={{ backgroundColor: '#fee', color: '#c00', padding: '10px', borderRadius: '4px' }}>
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div style={{ backgroundColor: '#efe', color: '#080', padding: '10px', borderRadius: '4px' }}>
              <p>Senha atualizada! Redirecionando para o login...</p>
            </div>
          )}

          <div className="reset-password__input-group">
            <p>Código de redefinição:</p>
            <Input
              type="text"
              description="Informe o código enviado por email"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </div>

          <div className="reset-password__input-group">
            <p>Senha:</p>
            <Input
              type="password"
              autoComplete="new-password"
              description="Mínimo 8 caracteres, com letras e números"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError(null);
              }}
              onBlur={() => setPasswordError(validatePassword(password, 'Nova senha'))}
              error={passwordError}
            />
          </div>

          <div className="reset-password__actions">
            <button onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}