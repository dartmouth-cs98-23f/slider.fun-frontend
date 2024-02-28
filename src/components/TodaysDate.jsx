import React from 'react';

const TodaysDate = () => {
  // Get the current date
  const currentDate = new Date();

  // Format the date as a string (e.g., "November 14, 2023")
  const dateString = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Render the date in JSX
  return (
    <div>
      <p style={{
        fontWeight: "400",
        opacity: "0.7",
      }}>{dateString}</p>

    </div >
  );
};

export default TodaysDate;