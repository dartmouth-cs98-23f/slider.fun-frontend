import React, { useEffect, useState } from 'react'
import Game from './Game'
import InfoModal from '../components/InfoModal'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPhoto, fetchAllPhotosByLikes } from '../actions/photoListAction';
import { defaultPhotoProperties, fetchPuzzleOfDay, setHasHowtoPlayShown } from '../actions/dailyAction'

const CURRENT_OPTIONS = defaultPhotoProperties;


const Daily = () => {
  const dispatch = useDispatch();
  const puzzleFetched = useSelector((state => state.daily.puzzleFetched));
  const photoListFetched = useSelector(state => state.photoList.photoListFetched);
  const [dailyBackUp, setDailyBackUp] = useState("65ee092c0e2b6d15b32ff4ef");
  // console.log(communityPhotoList)
  useEffect(() => {
    if (!photoListFetched) {
      dispatch(fetchAllPhotosByLikes());
      dispatch(fetchAllPhoto());
    }

    if (photoList) {
      setDailyBackUp(Object.keys(photoList)[hashValue])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!puzzleFetched) {
      dispatch(fetchPuzzleOfDay());
    }
    if (photoList) {
      setDailyBackUp(Object.keys(photoList)[hashValue])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const currentDate = new Date();
  const photoListLength = useSelector(state => Object.entries(state.photoList.community).length);
  const hashValue = Math.floor(((currentDate.getDate() * 3 / 2) + photoListLength) % photoListLength);
  // console.log(currentDate.getDate(), hashValue, photoListLength);
  const photoList = useSelector(state => state.photoList.community);

  // console.log([Object.keys(photoList)[hashValue]]);
  const dailyPuzzle = useSelector((state => state.daily.photo));
  const hasHowtoPlayShown = useSelector((state => state.daily.hasHowtoPlayShown));
  const [isModalVisible, setIsModalVisible] = useState(!hasHowtoPlayShown);
  // console.log(dailyBackUp);

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
      {/* {dailyBackUp ? */}
      <Game
        stageOptions={CURRENT_OPTIONS}
        closeModal={closeModal}
        openModal={openModal}
        pic_link={dailyPuzzle.photo ? `https://slider-fun.onrender.com/api/photo/${dailyPuzzle.photo}` : `https://slider-fun.onrender.com/api/photo/${dailyBackUp}`}
        daily={true}
        dailyPuzzleId={dailyPuzzle.id ? dailyPuzzle.id : dailyBackUp}
      /> :

      {/* <div className="loading">Loading........</div> */}
      {/* } */}
    </div>
  )
}

export default Daily