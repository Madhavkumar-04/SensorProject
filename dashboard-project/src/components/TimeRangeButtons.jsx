import React from 'react';

const TimeRangeButtons = ({ setTimeRange }) => {
    return (
        <div style={{ marginBottom: '20px' }} className='time-range-buttons'>
            <button onClick={() => setTimeRange(180)}>3H</button>
            <button onClick={() => setTimeRange(1440)}>1D</button>
            <button onClick={() => setTimeRange(10080)}>1W</button>
            <button onClick={() => setTimeRange(43200)}>1M</button>
            <button onClick={() => setTimeRange(525600)}>1Y</button>
        </div>
    );
};

export default TimeRangeButtons;
