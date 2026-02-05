import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyles = "px-6 py-2 rounded-full font-sans text-sm tracking-wider transition-all duration-300 disabled:opacity-50";
  
  const variants = {
    primary: "bg-gallery-900 text-white hover:bg-gray-700 hover:shadow-lg",
    secondary: "bg-white text-gallery-900 border border-gallery-900 hover:bg-gallery-50",
    ghost: "text-gray-500 hover:text-gallery-900 hover:bg-gray-100/50"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;