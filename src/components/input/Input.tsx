import './Input.css'
import React from 'react';

type ICard = {
  description?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  maxLength?: number
}

export default function Input({
  description,
  value,
  onChange,
  maxLength
}: ICard) {
  return (
    <input
      type="text"
      placeholder={description}
      value={value ?? ""}
      onChange={onChange}
      maxLength={maxLength}
    />
  );
}
