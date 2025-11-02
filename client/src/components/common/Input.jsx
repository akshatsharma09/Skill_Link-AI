import React from 'react';

const Input = ({
  label,
  type = 'text',
  id,
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id || name}
          className="block text-sm font-medium text-dark-300"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="mt-1">
        <input
          type={type}
          id={id || name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`block w-full rounded-md border-dark-600 bg-dark-700 text-dark-100 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
            error ? 'border-red-300' : ''
          }`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;