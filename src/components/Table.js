import React from 'react';
import moment from 'moment';
import '../style/Table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Table = ({ data, deleteHandler, clickHandler }) => {

  const tableBody = data.map((input, index) => (
    <tr className='tableBodyRow'key={index} onClick={() => clickHandler(input)}>
      <td className='tableCell date'>{moment(input.data.date).format('DD-MM-YYYY')}</td>
      <td className='tableCell'>{input.data.product}</td>
      <td className='tableCell'>{input.data.quantity}</td>
      <td className='tableCell'>{input.data.meterReading}</td>
      <td className='tableCell'>{input.data.initialFloat}</td>
      <td className='tableCell'>{input.data.waterUsage}</td>
      <td className='tableCell'>{input.data.pumpDial}</td>
      <td className='tableCell'>{input.data.float}</td>
      <td className='tableCell'>{input.data.reading}</td>
      <td className='tableCell'>{input.data.comments}</td>
      <td className='tableCell'>
        <div onClick={(event) => {
          event.stopPropagation();
          deleteHandler(input._id);
        }}>
          <span className='tableCell-icon'><FontAwesomeIcon icon={['far', 'trash-alt' ]}/></span>
        </div>
      </td>
    </tr>
  ));
   
  return (
    <div className='table-centerContainer'>
      <div className='tableContainer'>
        <table className='table'>
          <thead>
            <tr className='tableTitleRow'>
              <th className='tableTitle-style'>Date</th>
              <th className='tableTitle-style'>Product</th>
              <th className='tableTitle-style'>Quantity</th>
              <th className='tableTitle-style'>Meter Reading</th>
              <th className='tableTitle-style'>Float Before Delivery</th>
              <th className='tableTitle-style'>Water Usage</th>
              <th className='tableTitle-style'>Pump Dial</th>
              <th className='tableTitle-style'>Float</th>
              <th className='tableTitle-style'>Reading</th>
              <th className='tableTitle-style'>Comments</th>
              <th className='tableTitle-style'></th>
            </tr>
          </thead>
          <tbody>
            {tableBody}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
