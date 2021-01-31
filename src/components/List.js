import React from 'react';
import "../style/List.scss";
import AppButton from './AppButton';

const List = ({ farms, btnClickHandler }) => {

  const tbody = farms.map(farm => {
    return (
      <tr className='listBody' key={farm.farmName}>
        <td className='listBody__cell'>{farm.farmName}</td>
        <td className='listBody__cell'>
          <AppButton 
            handleClick={() => btnClickHandler(farm)}
            text={ farm.status === 0 ? 'Enable' : 'Disable' }
            classes={ farm.status === 0 ? 'enable' : 'disable' }
          />
        </td>
      </tr>
    );
  });

  return (
    <div className='listContainer'>
      <table className='list'>
        <thead className='list__head'>
          <tr className='listTitle'>
            <th className='listTitle__style'>Farm name</th>
            <th className='listTitle__style'></th>
          </tr>
        </thead>
        <tbody className='list__body'>
          {tbody}
        </tbody>
      </table>
    </div>
  )
}

export default List;
