import React, { useState, useEffect, useRef } from 'react'
import PuzzleCard from '../components/PuzzleCard'
import '../styles/community.scss';
import { useDispatch } from 'react-redux';
import { fetchAllPhoto, likePhoto } from '../actions/photoListAction';
import { useSelector } from 'react-redux';
import InfoModal from '../components/InfoModal';

const Community = () => {
  const dispatch = useDispatch();
  const hasFetchedPhotosRef = useRef(false);
  const userId = useSelector(state => state.user.info.id);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (!hasFetchedPhotosRef.current) {
      hasFetchedPhotosRef.current = true;
      dispatch(fetchAllPhoto());
    }
  }, []);

  const communityPhotoList = useSelector(state => state.photoList.community);

  const closeSignUpModal = () => {
    setIsModalVisible(false)
  };

  const openSignUpModal = () => {
    setIsModalVisible(true)
  }

  const puzzleCards = Object.keys(communityPhotoList).map((key, index) => (
    <PuzzleCard
      puzzleInfo={communityPhotoList[key]}
      id={communityPhotoList[key].id || index}
      key={index}
      photoListLocation="community"
      closeSignUpModal={closeSignUpModal}
      openSignUpModal={openSignUpModal}
      editMode={false}
      userId={userId}
    />
  ));

  return (
    <div>
      <InfoModal signUp={true} isModalVisible={isModalVisible} closeSignUpModal={closeSignUpModal} />
      <div className='communityPhotoContainer'> {puzzleCards} </div>
    </div>
  )
}

export default Community