import React from 'react';
import moment from 'moment';
import AppButton from './AppButton';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../style/DataForm.scss';

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
      <div className='dataForm'>
        <div className='dataInput'>
          <label className='dataInput__label'>Date:</label>
          <DatePicker 
            name='date'
            selected={moment(data.date).toDate()}
            dateFormat='dd/MM/yyyy'
            onChange={handleDateChange}
            className='dataInput__input'
          />
        </div>
        <div className='dataInput'>
          <label className='dataInput__label'>Product:</label>
          <select name='product' value={data.product} onChange={handleInputChange} className='dataInput__input'>
            <option value='blank'></option>
            <option value='SFW Acid'>SFW Acid</option>
            <option value='Chlorine'>Chlorine</option>
            <option value='Acid1'>Acid1</option>
            <option value='Acid2'>Acid2</option>
          </select>
        </div>
        <div className='dataInput'>
          <label className='dataInput__label'>Quantity:</label>
          <input 
            className='dataInput__input'
            type='number'
            name='quantity'
            value={data.quantity}
            onChange={handleInputChange}  
          />
        </div>
        <div className='dataInput'>
          <label className='dataInput__label'>Meter Reading:</label>
          <input 
            className='dataInput__input'
            type='number'
            name='meterReading'
            value={data.meterReading}
            onChange={handleInputChange}  
          />
        </div>
        <div className='dataInput'>
          <label className='dataInput__label'>Float Before Delivery:</label>
          <input 
            className='dataInput__input'
            type='number'
            name='initialFloat'
            value={data.initialFloat}
            onChange={handleInputChange}  
          />
        </div>
        <div className='dataInput'>
          <label className='dataInput__label'>Water Usage:</label>
          <input 
            className='dataInput__input'
            type='number'
            name='waterUsage'
            value={data.waterUsage}
            onChange={handleInputChange}  
          />
        </div>
        <div className='dataInput'>
          <label className='dataInput__label'>Pump Dial:</label>
          <input 
            className='dataInput__input'
            type='number'
            name='pumpDial'
            value={data.pumpDial}
            onChange={handleInputChange}  
            step='0.1'
          />
        </div>
        <div className='dataInput'>
          <label className='dataInput__label'>Float:</label>
          <input 
            className='dataInput__input'
            type='number'
            name='float'
            value={data.float}
            onChange={handleInputChange}  
          />
        </div>
        <div className='dataInput'>
          <label className='dataInput__label'>Reading:</label>
          <input 
            className='dataInput__input'
            type='number'
            name='reading'
            value={data.reading}
            onChange={handleInputChange}  
            step='0.1'
          />
        </div>
        <div className='dataInput'>
          <label className='dataInput__label'>Comments:</label>
          <textarea
            className='dataInput__comments'
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
          classes='medium red'
        />
      </div>
    </form>
  );
};

export default DataForm;
