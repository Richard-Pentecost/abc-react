import React from 'react';
import moment from 'moment';
import '../style/Table.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Table = ({ data, deleteHandler, clickHandler }) => {

  const tableBody = data.map((input, index) => (
    <tr className='tableBody'key={index} onClick={() => clickHandler(input)}>
      <td className='tableBody__cell tableDate'>{moment(input.data.date).format('DD-MM-YYYY')}</td>
      <td className='tableBody__cell'>{input.data.product}</td>
      <td className='tableBody__cell'>{input.data.quantity}</td>
      <td className='tableBody__cell'>{input.data.meterReading}</td>
      <td className='tableBody__cell'>{input.data.initialFloat}</td>
      <td className='tableBody__cell'>{input.data.waterUsage}</td>
      <td className='tableBody__cell'>{input.data.pumpDial}</td>
      <td className='tableBody__cell'>{input.data.float}</td>
      <td className='tableBody__cell'>{input.data.reading}</td>
      <td className='tableBody__cell'>{input.data.comments}</td>
      <td className='tableBody__cell'>
        <div onClick={(event) => {
          event.stopPropagation();
          deleteHandler(input._id);
        }}>
          <span className='tableIcon'><FontAwesomeIcon icon={['far', 'trash-alt' ]}/></span>
        </div>
      </td>
    </tr>
  ));
   
  return (
    <div className='tableContainer'>
      <table className='table'>
        <thead>
          <tr className='tableTitle'>
            <th className='tableTitle__style'>Date</th>
            <th className='tableTitle__style'>Quantity</th>
            <th className='tableTitle__style'>Product</th>
            <th className='tableTitle__style'>Meter Reading</th>
            <th className='tableTitle__style'>Float Before Delivery</th>
            <th className='tableTitle__style'>Water Usage</th>
            <th className='tableTitle__style'>Pump Dial</th>
            <th className='tableTitle__style'>Float</th>
            <th className='tableTitle__style'>Reading</th>
            <th className='tableTitle__style'>Comments</th>
            <th className='tableTitle__style'></th>
          </tr>
        </thead>
        <tbody>
          {tableBody}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
