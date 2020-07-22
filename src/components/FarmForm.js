import React from 'react';
import Input from './Input'
import Button from './Button';
import '../style/FarmForm.scss';

const FarmForm = props => {
  const {
    title,
    isAdmin, 
    farmName,
    postcode,
    contactName,
    contactNumber,
    handleSubmitForm,
    handleInputChange,
    handleBack,
    btnText,
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
        <Button text={btnText} disabled={!isAdmin} />
      </form>
    </div>
  );
};

export default FarmForm;
