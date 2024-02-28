import React, { useState } from 'react';
import "../styles/gameModal.scss";
import PhotoEdit from './PhotoEdit';

function GameModal({ puzzleInfo, isModalVisible, closeModal, setMessageVisability, editMode }) {
  const photoUrl = puzzleInfo.imageUrl;
  const [title, setTitle] = useState(puzzleInfo.title)
  // const photoProperties = puzzleInfo.photoProperties;
  // const likes = puzzleInfo.likes;
  const authorId = puzzleInfo.authorId;
  // const [isEditing, setIsEditing] = useState(false);

  // Define the onChange handler
  const handleChange = (event) => {
    setTitle(event.target.value); // Update the title state with the new value
    console.log(title)
  };

  return (

    <>

      {isModalVisible &&
        <div>

          <div className='exitButton' onClick={closeModal}> X </div>
          <div className="modalOverlay"></div>
          <div className="gameModal">
            {editMode &&
              <div>
                <label htmlFor="removePhoto"> Title: </label>
                <input type="text" id="removePhoto" name="removePhoto" value={title} onChange={handleChange} />
              </div>
            }
            <PhotoEdit
              puzzleInfo={puzzleInfo}
              editMode={editMode}
              photoUrl={photoUrl}
              userId={authorId}
              closeModal={closeModal}
              setMessageVisability={setMessageVisability}
            />
          </div>
        </div>
      }
    </>
  )
}

export default GameModal;
