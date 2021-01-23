import React from 'react';
import "../style/List.scss";

const List = ({ farms }) => {
  const tbody = farms.map(farm => {
    return (
      <tr className='listBody' key={farm.farmName}>
        <td className='listBody__cell'>{farm.farmName}</td>
        <td className='listBody__cell'><span>Button</span></td>
      </tr>
    );
  });

  return (
    <div className='listContainer'>
      <table className='list'>
        <thead>
          <tr className='listTitle'>
            <th className='listTitle__style'>Farm name</th>
            <th className='listTitle__style'></th>
          </tr>
        </thead>
        <tbody>
          {tbody}
        </tbody>
      </table>
    </div>
  )
}

export default List;
