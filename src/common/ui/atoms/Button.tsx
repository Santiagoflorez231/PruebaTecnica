import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  circle?: boolean;
  loading?: boolean;
}

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  circle = false,
  loading = false,
  className = '',
  disabled,
  ...props 
}: ButtonProps) => {
  const getClasses = () => {
    let classes = ['btn'];
    
    // Variante
    classes.push(`btn--${variant}`);
    
    // Tamaño
    if (size !== 'md') {
      classes.push(`btn--${size}`);
    }
    
    // Modificadores
    if (fullWidth) classes.push('btn--full');
    if (circle) classes.push('btn--circle');
    if (loading) classes.push('btn:loading');
    
    // Clases adicionales
    if (className) classes.push(className);
    
    return classes.join(' ');
  };

  return (
    <button 
      className={getClasses()} 
      disabled={disabled || loading}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
