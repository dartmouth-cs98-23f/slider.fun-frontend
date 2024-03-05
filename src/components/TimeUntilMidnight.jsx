import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

const TimeUntilMidnight = () => {
    const calculateTimeUntilMidnightEST = () => {
        const nowEST = moment().tz('America/New_York');
        const midnightEST = nowEST.clone().add(1, 'days').startOf('day');
        const timeUntilMidnight = midnightEST.diff(nowEST);
        return moment.utc(timeUntilMidnight).format('HH:mm:ss');
    };

    const [time, setTime] = useState(calculateTimeUntilMidnightEST());

    useEffect(() => {
        const timerID = setInterval(() => {
            setTime(calculateTimeUntilMidnightEST());
        }, 1000);

        return () => {
            clearInterval(timerID);
        };
    }, []);

    return (
        <div>
            <p>Come back in {time} to try again!</p>
        </div>
    );
};

export default TimeUntilMidnight;
