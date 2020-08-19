import React from 'react';
import '../style/RadioButton.scss';

const RadioButton = props => (
  <div className="radioSwitch">
    <input 
      className='radioSwitch__input'
      type="radio" 
      id="radio-one" 
      name={props.name} 
      value={props.firstValue} 
      checked={props.input === props.firstValue}
      onChange={props.inputChange}
    />
    <label htmlFor="radio-one" className='radioSwitch__label'>{props.firstLabel}</label>
    <input 
      className='radioSwitch__input'
      type="radio" 
      id="radio-two" 
      name={props.name} 
      value={props.secondValue} 
      checked={props.input === props.secondValue}
      onChange={props.inputChange}
    />
    <label htmlFor="radio-two" className='radioSwitch__label'>{props.secondLabel}</label>
  </div>
);

export default RadioButton;
