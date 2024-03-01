import React, { useEffect, useState } from 'react';
import "../styles/gameModal.scss";
import "../styles/game.scss"
import PhotoEdit from './PhotoEdit';
import { deletePhoto } from '../context/photoFunctions';
// used for edit

function GameModal({ puzzleInfo, isModalVisible, closeModal, setMessageVisability, editMode, username }) {
  const photoUrl = puzzleInfo.imageUrl;
  const [title, setTitle] = useState(puzzleInfo.title)
  // const photoProperties = puzzleInfo.photoProperties;
  // const likes = puzzleInfo.likes;
  const authorId = puzzleInfo.authorId;
  // const [isEditing, setIsEditing] = useState(false);

  // Define the onChange handle
  return (
    <>
      {isModalVisible &&
        <div>
          <div className='exitButton' onClick={closeModal}> X </div>
          <div className="modalOverlay"></div>
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
