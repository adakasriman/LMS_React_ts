import React from 'react';
import { TextField } from '@mui/material';

interface TextInputProps {
  label?: string;
  errorText?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: 'outlined' | 'filled' | 'standard';
  dataInput?: 'float-number' | 'alphabetic' | 'alpha-numeric' | 'numeric' | 'mobile' | 'text-area';
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  errorText,
  value,
  onChange,
  variant = 'outlined',
  dataInput,
  ...props
}) => {
  // Handle value filtering similar to jQuery
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    switch (dataInput) {
      case 'float-number':
        newValue = newValue.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        break;
      case 'alphabetic':
        newValue = newValue.replace(/[^a-zA-Z\s]/g, '');
        break;
      case 'alpha-numeric':
        newValue = newValue.replace(/[^A-Za-z0-9 ]/g, '');
        break;
      case 'numeric':
      case 'mobile':
        newValue = newValue.replace(/[^0-9]/g, '');
        break;
      case 'text-area':
        newValue = newValue.replace(/[^A-Za-z0-9 .-]/g, '');
        break;
      default:
        break;
    }

    e.target.value = newValue;
    onChange?.(e);
  };

  // Determine maxLength like in jQuery
  const maxLength = (() => {
    switch (dataInput) {
      case 'float-number':
      case 'numeric':
      case 'mobile':
        return 10;
      case 'alphabetic':
      case 'alpha-numeric':
        return 40;
      case 'text-area':
        return 250;
      default:
        return undefined;
    }
  })();

  return (
    <TextField
      fullWidth
      variant={variant}
      label={label}
      value={value}
      onChange={handleChange}
      error={Boolean(errorText)}
      helperText={errorText}
      size="small"
      inputProps={{
        maxLength,
        'data-input': dataInput,
      }}
      {...props}
    />
  );
};

export default TextInput;
