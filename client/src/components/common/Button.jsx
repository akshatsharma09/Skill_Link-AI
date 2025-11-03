import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline';

const variants = {
  primary: 'bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:shadow-2xl hover:shadow-primary-500/25 hover:scale-105',
  secondary: 'bg-gradient-to-r from-dark-700 to-dark-600 text-dark-100 ring-1 ring-inset ring-dark-600 hover:bg-gradient-to-r hover:from-dark-600 hover:to-dark-500 hover:shadow-lg hover:shadow-dark-500/25 hover:scale-105',
  danger: 'bg-gradient-to-r from-red-600 to-red-500 text-white hover:shadow-2xl hover:shadow-red-500/25 hover:scale-105',
  accent: 'bg-gradient-to-r from-accent-500 to-accent-400 text-white hover:shadow-2xl hover:shadow-accent-500/25 hover:scale-105',
  outline: 'border-2 border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white hover:shadow-lg hover:shadow-primary-500/25 hover:scale-105',
  ghost: 'text-dark-300 hover:text-primary-400 hover:bg-primary-500/10 hover:shadow-lg hover:shadow-primary-500/10 hover:scale-105',
};

const sizes = {
  xs: 'px-3 py-1.5 text-xs gap-1.5',
  sm: 'px-4 py-2 text-sm gap-2',
  md: 'px-6 py-3 text-base gap-3',
  lg: 'px-8 py-4 text-lg gap-4',
  xl: 'px-10 py-5 text-xl gap-5',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  to,
  type = 'button',
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = 'right',
  onClick,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseClasses = 'relative inline-flex items-center justify-center font-semibold rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 overflow-hidden group';
  const variantClasses = variants[variant];
  const sizeClasses = sizes[size];
  const disabledClasses = disabled || loading ? 'opacity-50 cursor-not-allowed' : '';

  const allClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${disabledClasses} ${className}`;

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const buttonContent = (
    <>
      {/* Background shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />

      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Content */}
      <span className={`relative z-10 flex items-center ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}>
        {/* Left icon */}
        {icon && iconPosition === 'left' && (
          <span className={`transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>
            {icon}
          </span>
        )}

        {/* Button text */}
        {children}

        {/* Right icon or default arrow */}
        {icon && iconPosition === 'right' ? (
          <span className={`transition-transform duration-300 ${isHovered ? 'translate-x-1 scale-110' : 'translate-x-0 scale-100'}`}>
            {icon}
          </span>
        ) : variant === 'primary' && !loading && (
          <ArrowRightIcon className={`transition-transform duration-300 ${isHovered ? 'translate-x-1 scale-110' : 'translate-x-0 scale-100'}`} />
        )}

        {/* Sparkles effect for accent variant */}
        {variant === 'accent' && !loading && (
          <SparklesIcon className={`ml-2 transition-all duration-300 ${isHovered ? 'opacity-100 scale-110 animate-pulse' : 'opacity-0 scale-100'}`} />
        )}
      </span>

      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-active:opacity-100 transition-opacity duration-150" />
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={allClasses}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={allClasses}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
