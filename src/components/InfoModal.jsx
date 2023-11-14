import React, { useState } from 'react';
import "../styles/results.scss";

function InfoModal(props) {
  const [loading, setLoading] = useState(false);
  
  console.log(props)

  // useState(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 700);
  // }, [loading]);

 


  return (
    <>
      {props.isModalVisible &&
        <div className="resultsModal">
          <div className="headerModal">
            <p> {props.text}</p>
            <div className="buttonsModal">
              <button onClick={props.closeModal}>Close</button>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default InfoModal;
