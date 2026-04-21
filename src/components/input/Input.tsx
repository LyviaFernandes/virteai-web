import './Input.css'
import React from 'react';

type ICard = {
  description?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  maxLength?: number
  type?: string
}

export default function Input({
  description,
  value,
  onChange,
  maxLength,
  type = "text"
}: ICard) {
  return (
    <input
      type={type}
      placeholder={description}
      value={value ?? ""}
      onChange={onChange}
      maxLength={maxLength}
    />
  );
}