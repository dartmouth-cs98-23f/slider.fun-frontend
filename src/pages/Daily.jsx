import React, { useEffect, useState } from 'react'
import Game from './Game'
import InfoModal from '../components/InfoModal'
import { useDispatch, useSelector } from 'react-redux';
import { defaultPhotoProperties, fetchPuzzleOfDay, setHasHowtoPlayShown } from '../actions/dailyAction'

const CURRENT_OPTIONS = defaultPhotoProperties;
const Daily = () => {
  const dispatch = useDispatch();
  const puzzleFetched = useSelector((state => state.daily.puzzleFetched));

  useEffect(() => {
    if (!puzzleFetched) {
      dispatch(fetchPuzzleOfDay());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dailyPuzzle = useSelector((state => state.daily.photo));
  const hasHowtoPlayShown = useSelector((state => state.daily.hasHowtoPlayShown));
  const [isModalVisible, setIsModalVisible] = useState(!hasHowtoPlayShown);

  const closeModal = () => {
    setIsModalVisible(false)
    dispatch(setHasHowtoPlayShown(true));
  };

  const openModal = () => {
    setIsModalVisible(true)
  };

  return (
    <div>
      {/* modal */}
      {isModalVisible && <div className="modal-overlay" onClick={() => closeModal()}></div>}
      <InfoModal isModalVisible={isModalVisible} daily={true} closeModal={closeModal} openModal={openModal} />


      {/* if dailyPuzzle valid */}
      {dailyPuzzle.photo &&
        <Game
          stageOptions={CURRENT_OPTIONS}
          closeModal={closeModal}
          openModal={openModal}
          pic_link={dailyPuzzle.photo ? `https://slider-fun.onrender.com/api/photo/${dailyPuzzle.photo}` : null}
          daily={true}
          dailyPuzzleId={dailyPuzzle.id}
        />}
    </div>
  )
}

export default Daily