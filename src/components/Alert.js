import React from 'react';

const Alert = ({ message }) => {

  const styles = {
    backgroundColor: '#fff0f0',
    border: '1px solid #ffdbdb',
    color: '#ff1e25',
    fontWeight: 400,
    borderRadius: '5px',
    padding: '10px',
    marginTop: '15px',
    fontSize: '14px',
  };

  return (
    <div style={styles}>{message}</div>
  );
};

export default Alert