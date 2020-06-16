import React from 'react';
import '../style/Input.scss';

const Input = (props) => {
  const { label, type, name, input, inputChange } = props;
  return (
    <div className="inputForm">
      <label className='inputForm__label'>{label}:</label>
      <input 
        className='inputForm__input'
        type={type}
        name={name}
        value={input}
        onChange={inputChange}  
      />
    </div>
  )
}

export default Input;