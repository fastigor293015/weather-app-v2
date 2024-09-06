import { forwardRef } from 'react';
import styles from './input.module.css';

export const Input = forwardRef((props, ref) => {
  const {
    type,
    value,
    onChange,
    onClick,
    setInputRef,
    className,
    children,
    ...otherProps
  } = props;

  return (
    <label className={styles.label}>
      <input
        ref={ref}
        type={type ?? 'text'}
        value={value}
        onChange={onChange}
        onClick={onClick}
        className={`
          ${styles.input} 
          ${className}`}
        {...otherProps}
      />
      {children}
    </label>
  );
});
