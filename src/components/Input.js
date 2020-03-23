import React from 'react';
import '../style/Input.css';

const Input = (props) => {
  const { label, type, name, input, inputChange } = props;
  return (
    <div className="input-field">
      <label className='label'>{label}:</label>
      <input 
        className='input'
        type={type}
        name={name}
        value={input}
        onChange={inputChange}  
      />
    </div>
  )
}

export default Input;