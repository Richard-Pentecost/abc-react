import React from 'react';
import moment from 'moment';
import AppButton from './AppButton';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../style/DataForm.css';

const DataForm = props => {
  const { 
    data,
    handleInputChange, 
    handleDateChange, 
    handleSubmitForm,
    handleCancel,
    btnText,
  } = props;

  return (
    <form onSubmit={handleSubmitForm}>
      <div className='inputContainer'>
        <div className='dataInputContainer'>
          <label className='inputLabel'>Date:</label>
          <DatePicker 
            name='date'
            selected={moment(data.date).toDate()}
            dateFormat='dd/MM/yyyy'
            onChange={handleDateChange}
            className='dataInput'
          />
        </div>
        <div className='dataInputContainer'>
          <label className='inputLabel'>Product:</label>
          <select name='product' value={data.product} onChange={handleInputChange} className='dataInput'>
            <option value='blank'></option>
            <option value='SFW Acid'>SFW Acid</option>
            <option value='Chlorine'>Chlorine</option>
            <option value='Acid1'>Acid1</option>
            <option value='Acid2'>Acid2</option>
          </select>
        </div>
        <div className='dataInputContainer'>
          <label className='inputLabel'>Quantity:</label>
          <input 
            className='dataInput'
            type='number'
            name='quantity'
            value={data.quantity}
            onChange={handleInputChange}  
          />
        </div>
        <div className='dataInputContainer'>
          <label className='inputLabel'>Meter Reading:</label>
          <input 
            className='dataInput'
            type='number'
            name='meterReading'
            value={data.meterReading}
            onChange={handleInputChange}  
          />
        </div>
        <div className='dataInputContainer'>
          <label className='inputLabel'>Float Before Delivery:</label>
          <input 
            className='dataInput'
            type='number'
            name='initialFloat'
            value={data.initialFloat}
            onChange={handleInputChange}  
          />
        </div>
        <div className='dataInputContainer'>
          <label className='inputLabel'>Water Usage:</label>
          <input 
            className='dataInput'
            type='number'
            name='waterUsage'
            value={data.waterUsage}
            onChange={handleInputChange}  
          />
        </div>
        <div className='dataInputContainer'>
          <label className='inputLabel'>Pump Dial:</label>
          <input 
            className='dataInput'
            type='number'
            name='pumpDial'
            value={data.pumpDial}
            onChange={handleInputChange}  
            step='0.1'
          />
        </div>
        <div className='dataInputContainer'>
          <label className='inputLabel'>Float:</label>
          <input 
            className='dataInput'
            type='number'
            name='float'
            value={data.float}
            onChange={handleInputChange}  
          />
        </div>
        <div className='dataInputContainer'>
          <label className='inputLabel'>Reading:</label>
          <input 
            className='dataInput'
            type='number'
            name='reading'
            value={data.reading}
            onChange={handleInputChange}  
            step='0.1'
          />
        </div>
        <div className='dataInputContainer'>
          <label className='inputLabel'>Comments:</label>
          <textarea
            className='commentsInput'
            rows='3'
            name='comments'
            value={data.comments}
            onChange={handleInputChange}  
          />
        </div>
      </div>
      <div className='btnContainer'>
        <AppButton 
          handleClick={handleSubmitForm}
          text={btnText}
        />
        <AppButton 
          handleClick={handleCancel}
          text='Cancel'
        />
      </div>
    </form>
  );
};

export default DataForm;
