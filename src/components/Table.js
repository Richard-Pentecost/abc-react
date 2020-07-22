import React from 'react';
import moment from 'moment';
import '../style/Table.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Table = ({ data, tableHeadings, isAdmin, deleteHandler, clickHandler }) => {

  const headings = tableHeadings.map((heading, index) => (
    <th key={index} className='tableTitle__style'>{heading}</th>
  ));

  let disableDeleteButton;

  if (!isAdmin) { disableDeleteButton = { 'display': 'none'}}

  const tbody = data.map((input, index) => (
    <tr className='tableBody' key={index} onClick={() => clickHandler(input)}>
      {
        Object.keys(input.data).map(inputKey => {
          let tableCell = <td className='tableBody__cell' key={inputKey}>{input.data[inputKey]}</td>;
          if (inputKey === 'date') {
            tableCell = <td className='tableBody__cell tableDate' key={inputKey}>{moment(input.data[inputKey]).format('DD-MM-YYYY')}</td>;
          };
          return tableCell;
        })
      }
      <td className='tableBody__cell' style={disableDeleteButton}>
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
            {headings}
          </tr>
        </thead>
        <tbody>
          {tbody}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
