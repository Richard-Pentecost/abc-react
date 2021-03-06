import React from 'react';
import Input from './Input'
import Button from './Button';
import RadioButton from './RadioButton';
import '../style/FarmForm.scss';

const FarmForm = props => {
  const {
    title,
    isAdmin, 
    farmName,
    postcode,
    contactName,
    contactNumber,
    deliveryMethod,
    accessCodes,
    comments,
    handleSubmitForm,
    handleInputChange,
    handleBack,
    btnText,
    loading,
  } = props;

  return (
    <div>
      <div className='farmForm'>
        <span className='farmForm__title'>{title}</span>
        <span className='farmForm__backLink' onClick={handleBack}>Go Back</span>
      </div>
      <form onSubmit={handleSubmitForm}>
        <Input
          disabled={!isAdmin}
          input={farmName}
          inputChange={handleInputChange} 
          label='Farm Name'
          name='farmName'
          type="text"
          required
        />
        <Input
          disabled={!isAdmin}
          input={postcode}
          inputChange={handleInputChange} 
          label='Postcode'
          name='postcode'
          type="text"
          required
        />
        <Input
          disabled={!isAdmin}
          input={contactName}
          inputChange={handleInputChange} 
          label='Contact Name'
          name='contactName'
          type="text"
          required
        />
        <Input
          disabled={!isAdmin}
          input={contactNumber}
          inputChange={handleInputChange} 
          label='Contact Number'
          name='contactNumber'
          type="text"
          required
        />
        <div className='commentBox'>
          <label className='commentBox__label'>Access Codes:</label>
          <textarea 
            className='commentBox__comments'
            rows='2'
            name='accessCodes'
            value={accessCodes}
            onChange={handleInputChange}
          />
        </div>
        <div className='commentBox'>
          <label className='commentBox__label'>Comments:</label>
          <textarea 
            className='commentBox__comments'
            rows='2'
            name='comments'
            value={comments}
            onChange={handleInputChange}
          />
        </div>
        <RadioButton 
          name='deliveryMethod'
          input={deliveryMethod}
          firstLabel='Tank'
          secondLabel='Drum'
          firstValue='tank'
          secondValue='drum'
          inputChange={handleInputChange}
        />
        
        <Button text={btnText} loading={loading} disabled={!isAdmin} />
      </form>
    </div>
  );
};

export default FarmForm;
