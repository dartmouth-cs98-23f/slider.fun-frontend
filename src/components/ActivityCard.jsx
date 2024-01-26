import React from 'react'
import { IconCamera, IconX } from '@tabler/icons-react';

const ActivityCard = (props) => {
  const header = props.header
  const content = props.content
  const date = props.date
  const type = props.type

  return (
    <div className='activityCard'>
      <div className='activityCardType'> {type === 1 ? <IconCamera /> : <IconX />} </div>
      <div className='activityCenterCard'>
        <div className='activityCardHeader'> {header} </div>
        <div className='activityCardContent'> {content} </div>
      </div>
      <div className='activityCardDate'> {date} </div>
    </div>
  )
}

export default ActivityCard