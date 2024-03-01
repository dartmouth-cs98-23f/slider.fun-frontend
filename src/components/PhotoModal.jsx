import React, { useState } from 'react';
import "../styles/infoModal.scss";
import PhotoCreation from './PhotoCreation';
import { IconXboxX } from '@tabler/icons-react';

// when there's no object in the database yet

function PhotoModal({ photoUrl, userId, isModalVisible, closeModal, setMessageVisability, setTitleMissingVis }) {

  const [title, setTitle] = useState("");

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <>
      {isModalVisible &&
        <div className="resultsModal">
          <div>
            <label htmlFor="removePhoto"> Title: </label>
            <input type="text" id="removePhoto" name="removePhoto" value={title} onChange={handleChange} />
          </div>
          <IconXboxX className='exitButton' onClick={closeModal}>Close</IconXboxX>

          <PhotoCreation
            title={title}
            photoUrl={photoUrl}
            userId={userId} closeModal={closeModal}
            setMessageVisability={setMessageVisability}
            setTitleMissingVis={setTitleMissingVis} />
        </div>
      }
    </>
  )
}

export default PhotoModal;
