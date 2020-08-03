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
  
  const { acidData, chlorineData, date } = data;

  return (
    <form onSubmit={handleSubmitForm}>
      <div className='dataForm'>
        <div className='dataInput'>
          <label className='dataInput__label'>Date:</label>
          <DatePicker 
            name='date'
            selected={moment(date).toDate()}
            dateFormat='dd/MM/yyyy'
            onChange={handleDateChange}
            className='dataInput__input'
          />
        </div>
        <div className='dataInput'>
          <label className='dataInput__label'>Product:</label>
          <div className='dataInput__container'>
            <div className='dataInput__individualContainer'>
              <select name='acid-product' value={acidData.product} onChange={handleInputChange} className='dataInput__input'>
                <option value='blank'></option>
                <option value='SFW Acid'>SFW Acid</option>
                <option value='Acid1'>Acid1</option>
                <option value='Acid2'>Acid2</option>
              </select>
            </div>
            <div className='dataInput__individualContainer'>
              <select name='chlorine-product' value={chlorineData.product} onChange={handleInputChange} className='dataInput__input'>
                <option value='Chlorine'>Chlorine</option>
              </select>
            </div>
          </div>
        </div>
        <div className='dataInput'>
          <label className='dataInput__label'>Quantity:</label>
          <div className='dataInput__container'>
            <div className='dataInput__individualContainer'>
              <input 
                className='dataInput__input'
                type='number'
                name='acid-quantity'
                value={acidData.quantity}
                onChange={handleInputChange}  
              />
            </div>
            <div className='dataInput__individualContainer'>
              <input 
                className='dataInput__input'
                type='number'
                name='chlorine-quantity'
                value={chlorineData.quantity}
                onChange={handleInputChange}  
              />
            </div>
          </div>
        </div>
        <div className='dataInput'>
          <label className='dataInput__label'>Meter Reading:</label>
          <div className='dataInput__container'>
            <div className='dataInput__individualContainer'>
              <input 
                className='dataInput__input'
                type='number'
                name='acid-meterReading'
                value={acidData.meterReading}
                onChange={handleInputChange}  
              />
            </div>
            <div className='dataInput__individualContainer'>
              <input 
                className='dataInput__input'
                type='number'
                name='chlorine-meterReading'
                value={chlorineData.meterReading}
                onChange={handleInputChange}  
              />
            </div>
          </div>
        </div>
        <div className='dataInput'>
          <label className='dataInput__label'>Float Before Delivery:</label>
          <div className='dataInput__container'>
            <div className='dataInput__individualContainer'>
              <input 
                className='dataInput__input'
                type='number'
                name='acid-initialFloat'
                value={acidData.initialFloat}
                onChange={handleInputChange}  
              />
            </div>
            <div className='dataInput__individualContainer'>
              <input 
                className='dataInput__input'
                type='number'
                name='chlorine-initialFloat'
                value={chlorineData.initialFloat}
                onChange={handleInputChange}  
              />
            </div>
          </div>
        </div>
        <div className='dataInput'>
          <label className='dataInput__label'>Pump Dial:</label>
          <div className='dataInput__container'>
            <div className='dataInput__individualContainer'>  
              <input 
                className='dataInput__input'
                type='number'
                name='acid-pumpDial'
                value={acidData.pumpDial}
                onChange={handleInputChange}  
                step='0.1'
              />
            </div>
            <div className='dataInput__individualContainer'>
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
        </div>
        <div className='dataInput'>
          <label className='dataInput__label'>Float:</label>
          <div className='dataInput__container'>
            <div className='dataInput__individualContainer'>            
              <input 
                className='dataInput__input'
                type='number'
                name='acid-float'
                value={acidData.float}
                onChange={handleInputChange}  
              />
            </div>
            <div className='dataInput__individualContainer'>
              <input 
                className='dataInput__input'
                type='number'
                name='chlorine-float'
                value={chlorineData.float}
                onChange={handleInputChange}  
              />
            </div>
          </div>
        </div>
        <div className='dataInput'>
          <label className='dataInput__label'>Reading:</label>
          <div className='dataInput__container'>
            <div className='dataInput__individualContainer'>
              <input 
                className='dataInput__input'
                type='number'
                name='acid-reading'
                value={acidData.reading}
                onChange={handleInputChange}  
                step='0.1'
              />
            </div> 
            <div className='dataInput__individualContainer'>
              <input 
                className='dataInput__input'
                type='number'
                name='chlorine-reading'
                value={chlorineData.reading}
                onChange={handleInputChange}  
                step='0.1'
              />
            </div>
          </div>
        </div>
        <div className='dataInput'>
          <label className='dataInput__label'>Comments:</label>
          <div className='dataInput__container'>
            <div className='dataInput__individualContainer'>
              <textarea
                className='dataInput__comments'
                rows='3'
                name='acid-comments'
                value={acidData.comments}
                onChange={handleInputChange}  
              />
            </div>
            <div className='dataInput__individualContainer'>
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
