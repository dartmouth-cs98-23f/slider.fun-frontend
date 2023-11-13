import React from 'react'

const CustomHandle = (props) => {
  return <div style={{
    width: props.portrait ? '100%' : '0.25rem',
    height: props.portrait ? '0.25rem' : '100%',
    backgroundColor: '#E27272',
    borderRadius: "5px",
  }} />;
}

export default CustomHandle