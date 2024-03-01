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

  // Define the onChange handler
  const handleChange = (event) => {
    setTitle(event.target.value); // Update the title state with the new value
    console.log(title)
  };


  async function handleDelete() {
    try {
      await deletePhoto(puzzleInfo.id);
      closeModal();
      // setMessageVisability(true);
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  }

  return (
    <>
      {isModalVisible &&
        <div>
          <div className='exitButton' onClick={closeModal}> X </div>
          <div className="modalOverlay"></div>
          <div className="gameModal">
            {editMode ?
              <div id="editFields">
                <div>
                  <label htmlFor="photoTitle"> Title: </label>
                  <input type="text" id="photoTitle" name="photoTitle" value={title} onChange={handleChange} />
                </div>
                <button className="red" onClick={handleDelete}> Delete Photo</button>
              </div> :
              <div>
                <h2 htmlFor="photoTitle"> {title} </h2>
              </div>
            }
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
