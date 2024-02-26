import React from 'react'
import ActivityCard from './ActivityCard'

const Activity = ({ userInfo }) => {
  const activities = [
    {
      "header": "Completed Puzzle 1",
      "content": "user has completed puzzle 1",
      "date": "2020-01-01",
      "type": 1
    },
    {
      "header": "Completed Puzzle 2",
      "content": "user has completed puzzle 2",
      "date": "2020-01-01",
      "type": 0
    },
  ]


  const activityCards = activities.map((activity, index) => {
    return (
      <ActivityCard
        key={index}
        header={activity.header}
        content={activity.content}
        date={activity.date}
        type={activity.type}
      />
    )
  }
  )

  return (
    <div className='activityCards'>
      <div className='headerText' style={{ padding: "5px" }} > {userInfo.username ? userInfo.username : userInfo.email}'s recent activity </div>
      {activityCards.length < 1 ? "No activity yet" : activityCards}
    </div >
  )
}

export default Activity