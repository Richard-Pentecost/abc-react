import React from 'react';
import Input from './Input'
import Button from './Button';
import '../style/FarmForm.css';

const FarmForm = props => {
  const {
    title, 
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
      <div className='farmForm-titleContainer'>
        <span className='farmForm-title'>{title}</span>
        <span className='farmForm-backLink' onClick={handleBack}>Go Back</span>
      </div>
      <form onSubmit={handleSubmitForm}>
        <Input
          input={farmName}
          inputChange={handleInputChange} 
          label='Farm Name'
          name='farmName'
          type="text"
          required
        />
        <Input
          input={postcode}
          inputChange={handleInputChange} 
          label='Postcode'
          name='postcode'
          type="text"
          required
        />
        <Input
          input={contactName}
          inputChange={handleInputChange} 
          label='Contact Name'
          name='contactName'
          type="text"
          required
        />
        <Input
          input={contactNumber}
          inputChange={handleInputChange} 
          label='Contact Number'
          name='contactNumber'
          type="text"
          required
        />
        <Button text={btnText}/>
      </form>
    </div>
  );
};

export default FarmForm;
