import React from 'react';

const Card = ({
  children,
  className = '',
  shadow = 'sm',
  rounded = 'xl',
  ...props
}) => {
  const shadows = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };

  const roundedClasses = {
    xl: 'rounded-xl',
    lg: 'rounded-lg',
    md: 'rounded-md',
  };

  return (
    <div
      className={`bg-white ${shadows[shadow]} ${roundedClasses[rounded]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;