import React, { useState, useEffect } from 'react'
import PuzzleCard from '../components/PuzzleCard'
import '../styles/community.scss';
import { useDispatch } from 'react-redux';
import { fetchAllPhoto, fetchAllPhotosByLikes } from '../actions/photoListAction';
import { useSelector } from 'react-redux';
import InfoModal from '../components/InfoModal';
import CommunityFilter from '../components/CommunityFilter';

const Community = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.info.id);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const photoListFetched = useSelector(state => state.photoList.photoListFetched);
  const photoListByLikes = useSelector(state => state.photoList.communityByLikes);
  const photoList = useSelector(state => state.photoList.community);
  const selectedList = useSelector(state => state.photoList.selected);

  // console.log(communityPhotoList)
  useEffect(() => {
    if (!photoListFetched) {
      dispatch(fetchAllPhotosByLikes());
      dispatch(fetchAllPhoto());
    }
  }, []);



  const closeSignUpModal = () => {
    setIsModalVisible(false)
  };

  const openSignUpModal = () => {
    setIsModalVisible(true)
  }

  const puzzleCardsByLikes = Object.keys(photoListByLikes).map((key, index) => (
    <PuzzleCard
      puzzleInfo={photoListByLikes[key]}
      id={photoListByLikes[key].id || index}
      key={index}
      photoListLocation="community"
      closeSignUpModal={closeSignUpModal}
      openSignUpModal={openSignUpModal}
      editMode={false}
      userId={userId}
    />
  ));


  const puzzleCards = Object.keys(photoList).map((key, index) => (
    <PuzzleCard
      puzzleInfo={photoList[key]}
      id={photoList[key].id || index}
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
      <div className='communityPhotoContainer'>
        <CommunityFilter />
        <br />

        {selectedList === "byLikes" ? puzzleCardsByLikes : puzzleCards}

      </div>
    </div>
  )
}

export default Community