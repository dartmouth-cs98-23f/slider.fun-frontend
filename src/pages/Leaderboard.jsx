import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTop25 } from '../actions/leaderboardAction';
import UserCard from '../components/UserCard';
import '../styles/leaderboard.scss';

const Leaderboard = () => {
  const dispatch = useDispatch();
  const top25 = useSelector(state => state.leaderboard.top25)
  // console.log(communityPhotoList)
  useEffect(() => {

    dispatch(getTop25());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const userCards = Object.keys(top25).map((key, index) => (
    <UserCard
      key={index}
      rank={index}
      userInfo={top25[key]}
    />
  ));

  // console.log(top25)
  return (
    <div className="leaderboardPageContainer">
      <h1 className='leaderboard'>Leaderboard</h1>
      <div className='userCardsContainer'>

        <div className='userCardContainer'>
          <div className='leftContainer'>
            <h3>  Rank </h3>
            <div>  User  </div>
          </div>
          <div className='rightContainer'> Points
          </div>
        </div>
        {userCards}
      </div>
    </div>
  )
}

export default Leaderboard