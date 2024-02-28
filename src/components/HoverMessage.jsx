import React from 'react';

const HoverMessage = (props) => {
  const isVisible = props.messageVisability

  if (!isVisible) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: '30%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'lightgrey',
      padding: '10px',
      borderRadius: '5px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
      opacity: '0.9',
    }}>
      {props.message}
    </div>
  );
};

export default HoverMessage;
