import React from 'react';
import '../styles/todaysDate.scss'; // Import the new SASS file for styling

const TodaysDate = () => {
  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="todaysDate">
      <p>{dateString}</p>
    </div>
  );
};

export default TodaysDate;
