import React, { CSSProperties } from 'react'

export interface ButtonProps {
  text: string,
  onClick: () => void,
  operatorActive?: string,
  className?: string,
  style?: CSSProperties,
  dataTestId?: string
}

const Button = ({ text, onClick, operatorActive, className = '', style, dataTestId }: ButtonProps) => {
  return (
    <div {...{ style }} data-testid={dataTestId} onClick={() => onClick()} className={`button w-100 ${operatorActive === text ? 'active' : ''} ${className}`}>
      <p className='text-center'>{text}</p>
    </div>
  )
}

export default Button
