import React, { useState, useEffect } from 'react'
import PuzzleCard from '../components/PhotoCard'
import '../styles/community.scss';
import { useDispatch } from 'react-redux';
import { fetchAllPhoto, fetchAllPhotosByLikes, setReportPhotoVis, setScoreHighMessageVis, setScoreLowMessageVis } from '../actions/photoListAction';
import { useSelector } from 'react-redux';
import InfoModal from '../components/InfoModal';
import CommunityFilter from '../components/CommunityFilter';
import HoverMessage from '../components/HoverMessage';

const Community = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.info.id);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const photoListFetched = useSelector(state => state.photoList.photoListFetched);
  const photoListByLikes = useSelector(state => state.photoList.communityByLikes);
  const photoList = useSelector(state => state.photoList.community);
  const selectedList = useSelector(state => state.photoList.selected);
  const scoreLowMessageVis = useSelector(state => state.photoList.scoreLowMessageVis);
  const scoreHighMessageVis = useSelector(state => state.photoList.scoreHighMessageVis);
  const photoReportedMessageVis = useSelector(state => state.photoList.reportedMessageVis);
  const currentPhotoScore = useSelector(state => state.photoList.currentPhotoScore);

  // console.log(communityPhotoList)
  useEffect(() => {
    if (!photoListFetched) {
      dispatch(fetchAllPhotosByLikes());
      dispatch(fetchAllPhoto());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  useEffect(() => {
    // wait for 2 seconds before hiding the message
    const timer = setTimeout(() => {
      dispatch(setScoreHighMessageVis(false));
    }, 2000);

    return () => clearTimeout(timer);
  }, [dispatch, scoreHighMessageVis]);

  useEffect(() => {
    // wait for 2 seconds before hiding the message
    const timer = setTimeout(() => {
      dispatch(setScoreLowMessageVis(false));
    }, 2000);

    return () => clearTimeout(timer);
  }, [dispatch, scoreLowMessageVis]);

  useEffect(() => {
    // wait for 2 seconds before hiding the message
    const timer = setTimeout(() => {
      dispatch(setReportPhotoVis(false));
    }, 2000);

    return () => clearTimeout(timer);
  }, [dispatch, photoReportedMessageVis]);

  return (
    <div>


      <InfoModal signUp={true} isModalVisible={isModalVisible} closeSignUpModal={closeSignUpModal} />
      <HoverMessage message={`Try again! You got a ${currentPhotoScore}`} messageVisability={scoreLowMessageVis} />
      <HoverMessage message={`+1 SliderPoint! You got a ${currentPhotoScore} `} messageVisability={scoreHighMessageVis} />
      <HoverMessage message={`Photo reported! `} messageVisability={photoReportedMessageVis} />
      <div className='communityPhotoContainer'>
        <CommunityFilter />
        {selectedList === "byLikes" ? puzzleCardsByLikes : puzzleCards}
      </div>
    </div>
  )
}

export default Community