import './Input.css'
import React from 'react';

type ICard = {
  description?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  maxLength?: number
  type?: string
  error?: string | null
  name?: string
  autoComplete?: string
}

export default function Input({
  description,
  value,
  onChange,
  onBlur,
  maxLength,
  type = "text",
  error,
  name,
  autoComplete,
}: ICard) {
  return (
    <div className={`input-wrapper${error ? ' input-wrapper--error' : ''}`}>
      <input
        type={type}
        name={name}
        placeholder={description}
        value={value ?? ""}
        onChange={onChange}
        onBlur={onBlur}
        maxLength={maxLength}
        autoComplete={autoComplete}
        aria-invalid={!!error}
      />
      {error && <small className="input-error-message">{error}</small>}
    </div>
  );
}
