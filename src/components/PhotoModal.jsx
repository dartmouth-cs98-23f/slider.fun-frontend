import React from 'react';
import "../styles/infoModal.scss";
import PhotoCreation from './PhotoCreation';
import "../styles/infoModal.scss";
import { IconXboxX } from '@tabler/icons-react';


function PhotoModal({ photoUrl, userId, isModalVisible, closeModal, setMessageVisability }) {
  return (
    <>
      {isModalVisible &&
        <div className="resultsModal">
          <IconXboxX className='exitButton' onClick={closeModal}>Close</IconXboxX>
          <PhotoCreation photoUrl={photoUrl} userId={userId} closeModal={closeModal} setMessageVisability={setMessageVisability} />
        </div>
      }
    </>
  )
}

export default PhotoModal;
