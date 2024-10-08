import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getTickValues, formatXAxis } from './utils';
import {format} from 'date-fns'
import TimeRangeButtons from './TimeRangeButtons';
const MotionSensor = () => {
    const [timeRange, setTimeRange] = useState(60); // Default to 60 minutes (1 hour)
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`/api/motionSensor?range=${timeRange}`);
            if (!response.ok) {
              throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const result = await response.json();
            setData(result);
          } catch (err) {
            setData([]); // Clear data in case of error
          }
        };
    
        fetchData();
      }, [timeRange]);
    const ticks = getTickValues(timeRange);
    const CustomTooltip = ({ payload, label }) => {
        if (payload && payload.length) {
          const { timestamp, value } = payload[0].payload;
          return (
            <div className="custom-tooltip">
              <p className="label">{`Time: ${format(new Date(timestamp), 'PPpp')}`}</p>
              <p className="intro">{`motion: ${value} ms`}</p>
            </div>
          );
        }
        return null;
      };
    return (
        <div style={{width:'40vw'}}>
            <TimeRangeButtons setTimeRange={setTimeRange} />
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                    <XAxis dataKey="timestamp" tickFormatter={(tick) => formatXAxis(tick, timeRange)} ticks={ticks} interval={0} />
                    <YAxis label={{ value: 'Motion Detected', angle: -90, position: 'insideLeft' }} domain={[0, 1]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MotionSensor;
