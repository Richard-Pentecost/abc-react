import React from 'react';
import '../style/HeaderSection.scss';

const HeaderSection = (props) => {
  return (
    <div className='headerSection'>
      {props.children}
    </div>
  );
};

export default HeaderSection;
