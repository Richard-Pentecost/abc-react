import React from 'react';
import moment from 'moment';
import '../style/Table.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Table = ({ data, tableHeadings, isAdmin, deleteHandler, clickHandler, farmFlag }) => {
  
  const headings = tableHeadings.map((heading, index) => (
    <th key={index} className='tableTitle__style'>{heading}</th>
  ));
  
  let disableDeleteButton;

  if (!isAdmin) { disableDeleteButton = { 'display': 'none'}};

  const createTableRows = (rowData, date, key, input) => {
    return (
      <tr className='tableBody' key={key} onClick={() => clickHandler(input)}>
        { date ? <td className='tableBody__cell tableDate' >{moment(date).format('ddd, DD-MM-YYYY')}</td> : null }
        {
          Object.keys(rowData).map(inputKey => {
            let data = rowData[inputKey];
            let additionalClass;
            inputKey === 'comments' && rowData[inputKey] ? additionalClass = 'tableComment' : additionalClass = '';
            if (inputKey === 'deliveryDate' && rowData[inputKey]) {
              data = moment(rowData[inputKey]).format('ddd, DD-MM-YYYY');
              additionalClass = 'tableDate';
            }
            return <td className={`tableBody__cell ${additionalClass}`} key={inputKey}>{data}</td>;
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
    )
  };

  const tbody = data.map((input, index) => {
    if (farmFlag) {
      const acidKey=`acid${index}`;
      const chlorineKey=`chlorine${index}`;
      const acidRow =  createTableRows(input.acidData, input.date, acidKey, input);
      const chlorineRow = createTableRows(input.chlorineData, input.date, chlorineKey, input);
      return [ acidRow, chlorineRow ];
    } else {
      const row = createTableRows(input.data, null, index, input);
      return[row];
    }
  });

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
