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
    loading,
  } = props;
  
  const { acidData, chlorineData, date } = data;

  return (
    <form onSubmit={handleSubmitForm}>
      <div className='dataForm'>
        <div className='dataInput'>
          <div className='dataInput__container'>
            <label className='dataInput__label'>Date:</label>
            <DatePicker 
              name='date'
              selected={moment(date).toDate()}
              dateFormat='dd/MM/yyyy'
              onChange={handleDateChange}
              className='dataInput__input'
            />
          </div>
        </div>
        <div className='dataInput'>
          <div className='dataInput__container'>
            <label className='dataInput__label'>Product:</label>
            <select name='acid-product' value={acidData.product} onChange={handleInputChange} className='dataInput__input'>
              <option value='blank'></option>
              <option value='SFW Acid'>SFW Acid</option>
              <option value='SFW Formic'>SFW Formic</option>
              <option value='PWT Acid'>PWT Acid</option>
            </select>
          </div>
          <div className='dataInput__container'>
            <label className='dataInput__label'>Product:</label>
            <select name='chlorine-product' value={chlorineData.product} onChange={handleInputChange} className='dataInput__input'>
              <option value='Chlorine'>Chlorine</option>
            </select>
          </div>
        </div>
        <div className='dataInput'>
          <div className='dataInput__container'>
            <label className='dataInput__label'>Quantity:</label>
            <input 
              className='dataInput__input'
              type='number'
              name='acid-quantity'
              value={acidData.quantity}
              onChange={handleInputChange}  
            />
          </div>
          <div className='dataInput__container'>
            <label className='dataInput__label'>Quantity:</label>
            <input 
              className='dataInput__input'
              type='number'
              name='chlorine-quantity'
              value={chlorineData.quantity}
              onChange={handleInputChange}  
            />
          </div>
        </div>
        <div className='dataInput'>
          <div className='dataInput__container'>
            <label className='dataInput__label'>Meter Reading:</label>
            <input 
              className='dataInput__input'
              type='number'
              name='acid-meterReading'
              value={acidData.meterReading}
              onChange={handleInputChange}  
            />
          </div>
          <div className='dataInput__container'>
            <label className='dataInput__label'>Meter Reading:</label>
            <input 
              className='dataInput__input'
              type='number'
              name='chlorine-meterReading'
              value={chlorineData.meterReading}
              onChange={handleInputChange}  
            />
          </div>
        </div>
        <div className='dataInput'>
          <div className='dataInput__container'>
            <label className='dataInput__label'>Float Before Delivery:</label>
            <input 
              className='dataInput__input'
              type='number'
              name='acid-initialFloat'
              value={acidData.initialFloat}
              onChange={handleInputChange}  
            />
          </div>
          <div className='dataInput__container'>
            <label className='dataInput__label'>Float Before Delivery:</label>
            <input 
              className='dataInput__input'
              type='number'
              name='chlorine-initialFloat'
              value={chlorineData.initialFloat}
              onChange={handleInputChange}  
            />
          </div>
        </div>
        <div className='dataInput'>
          <div className='dataInput__container'>  
            <label className='dataInput__label'>Pump Dial:</label>
            <input 
              className='dataInput__input'
              type='number'
              name='acid-pumpDial'
              value={acidData.pumpDial}
              onChange={handleInputChange}  
              step='0.1'
            />
          </div>
          <div className='dataInput__container'>
            <label className='dataInput__label'>Pump Dial:</label>
            <input 
              className='dataInput__input'
              type='number'
              name='chlorine-pumpDial'
              value={chlorineData.pumpDial}
              onChange={handleInputChange}  
              step='0.1'
            />
          </div>
        </div>
        <div className='dataInput'>
          <div className='dataInput__container'>  
            <label className='dataInput__label'>Float:</label>          
            <input 
              className='dataInput__input'
              type='number'
              name='acid-float'
              value={acidData.float}
              onChange={handleInputChange}  
            />
          </div>
          <div className='dataInput__container'>
            <label className='dataInput__label'>Float:</label>
            <input 
              className='dataInput__input'
              type='number'
              name='chlorine-float'
              value={chlorineData.float}
              onChange={handleInputChange}  
            />
          </div>
        </div>
        <div className='dataInput'>
          <div className='dataInput__container'>
            <label className='dataInput__label'>Reading:</label>
            <input 
              className='dataInput__input'
              type='text'
              name='acid-reading'
              value={acidData.reading}
              onChange={handleInputChange}  
            />
          </div> 
          <div className='dataInput__container'>
            <label className='dataInput__label'>Reading:</label>
            <input 
              className='dataInput__input'
              type='text'
              name='chlorine-reading'
              value={chlorineData.reading}
              onChange={handleInputChange}  
            />
          </div>
        </div>
        <div className='dataInput'>
          <div className='dataInput__container'>
            <label className='dataInput__label'>Comments:</label>
            <textarea
              className='dataInput__comments'
              rows='3'
              name='acid-comments'
              value={acidData.comments}
              onChange={handleInputChange}  
            />
          </div>
          <div className='dataInput__container'>
            <label className='dataInput__label'>Comments:</label>
            <textarea
              className='dataInput__comments'
              rows='3'
              name='chlorine-comments'
              value={chlorineData.comments}
              onChange={handleInputChange}  
            />
          </div>
        </div>
      </div>
      <div className='btnContainer'>
        <AppButton 
          loading={loading}
          handleClick={handleSubmitForm}
          text={btnText}
        />
        <AppButton 
          loading={loading}
          handleClick={handleCancel}
          text='Cancel'
          classes='medium red'
        />
      </div>
    </form>
  );
};

export default DataForm;
