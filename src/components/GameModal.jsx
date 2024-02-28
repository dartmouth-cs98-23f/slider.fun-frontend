import React from 'react';
import "../styles/gameModal.scss";
import PhotoCreation from './PhotoCreation';
import { IconXboxX } from '@tabler/icons-react';


function GameModal({ puzzleInfo, isModalVisible, closeModal, setMessageVisability }) {
  const photoUrl = puzzleInfo.imageUrl;
  const photoProperties = puzzleInfo.photoProperties;
  const likes = puzzleInfo.likes;
  const authorId = puzzleInfo.authorId;
  return (

    <>
      {isModalVisible &&
        <div>
          <div className='exitButton' onClick={closeModal}> X </div>
          <div className="modalOverlay"></div>
          <div className="gameModal">
            <PhotoCreation photoUrl={photoUrl} userId={authorId} closeModal={closeModal} setMessageVisability={setMessageVisability} />
          </div>
        </div>
      }
    </>
  )
}

export default GameModal;
