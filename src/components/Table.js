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
  
  // const tbody = data.map((input, index) => {
  //   return (
  //     <tr className='tableBody' key={index} onClick={() => clickHandler(input)}>
  //       <td className='tableBody__cell tableDate' >{moment(input.date).format('DD-MM-YYYY')}</td>
  //       {
  //         Object.keys(input.acidData).map(inputKey => {
  //           return <td className='tableBody__cell' key={inputKey}>{input.acidData[inputKey]}</td>;
  //         })

  //       }
  //       <td className='tableBody__cell' style={disableDeleteButton}>
  //         <div onClick={(event) => {
  //           event.stopPropagation();
  //           deleteHandler(input._id);
  //         }}>
  //           <span className='tableIcon'><FontAwesomeIcon icon={['far', 'trash-alt' ]}/></span>
  //         </div>
  //       </td>
  //     </tr>
  //   )
  // });
  const tbody = data.map((input, index) => {
    const acidKey=`acid${index}`;
    const chlorineKey=`chlorine${index}`;
    const acidRow =  createTableRows(input.acidData, input.date, acidKey, input);
    const chlorineRow = createTableRows(input.chlorineData, input.date, chlorineKey, input);
    return [ acidRow, chlorineRow ];
  });

  function createTableRows(rowData, date, key, input) {
    return (
      <tr className='tableBody' key={key} onClick={() => clickHandler(input)}>
        <td className='tableBody__cell tableDate' >{moment(date).format('DD-MM-YYYY')}</td>
        {
          Object.keys(rowData).map(inputKey => {
            return <td className='tableBody__cell' key={inputKey}>{rowData[inputKey]}</td>;
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
