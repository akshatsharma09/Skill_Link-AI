import React from 'react';
import { Link } from 'react-router-dom';

const variants = {
  primary: 'bg-primary-600 text-white hover:bg-primary-500',
  secondary: 'bg-dark-700 text-dark-100 ring-1 ring-inset ring-dark-600 hover:bg-dark-600',
  danger: 'bg-red-600 text-white hover:bg-red-500',
};

const sizes = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-2 text-sm',
  lg: 'px-4 py-2 text-base',
  xl: 'px-6 py-3 text-base',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  to,
  type = 'button',
  disabled = false,
  onClick,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200';
  const variantClasses = variants[variant];
  const sizeClasses = sizes[size];
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  const allClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${disabledClasses} ${className}`;

  if (to) {
    return (
      <Link to={to} className={allClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={allClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;