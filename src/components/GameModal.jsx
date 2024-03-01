import React, { useState } from 'react';
import "../styles/gameModal.scss";
import "../styles/game.scss"
import PhotoEdit from './PhotoEdit';

// used for editing the photo
function GameModal({ puzzleInfo, isModalVisible, closeModal, setMessageVisability, editMode }) {
  const photoUrl = puzzleInfo.imageUrl;
  const [title] = useState(puzzleInfo.title);
  const authorId = puzzleInfo.authorId;

  return (
    <>
      {isModalVisible &&
        <div>
          <div className='exitButton' onClick={() => closeModal()} > X </div>
          <div className="modalOverlay" onClick={() => closeModal()} ></div>
          <div className="gameModal">
            <PhotoEdit
              puzzleInfo={puzzleInfo}
              editMode={editMode}
              photoUrl={photoUrl}
              userId={authorId}
              closeModal={closeModal}
              title={title}
              setMessageVisability={setMessageVisability}
            />
          </div>
        </div>
      }
    </>
  )
}

export default GameModal;
