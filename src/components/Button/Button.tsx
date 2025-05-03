import React from 'react';
import StyledButton from '././Button.styles';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'solid' | 'outline';
};

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled, variant = 'solid'}) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled} className={variant}>
      {children}
    </StyledButton>
  );
};

export default Button;