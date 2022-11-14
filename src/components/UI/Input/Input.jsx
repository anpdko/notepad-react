import React from 'react'
import styles from './Input.module.scss'

const Input = ({placeholder, className, ...props}) => {
   return (
      <input placeholder={placeholder} {...props} className={`${styles.input} ${className}`}/>
   );
};
export default Input