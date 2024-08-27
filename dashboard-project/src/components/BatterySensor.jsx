import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {  getTickValues, formatXAxis, } from './utils';
import {format} from 'date-fns'
import TimeRangeButtons from './TimeRangeButtons';
const BatterySensor = () => {
    const [timeRange, setTimeRange] = useState(60); // Default to 60 minutes (1 hour)
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`/api/batterySensor?range=${timeRange}`);
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
              <p className="intro">{`battery: ${value} %`}</p>
            </div>
          );
        }
        return null;
      };
    return (
        <div style={{width:'80vw'}}>
            <TimeRangeButtons setTimeRange={setTimeRange} />
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                    <XAxis dataKey="timestamp" tickFormatter={(tick) => formatXAxis(tick, timeRange)} ticks={ticks} interval={0} />
                    <YAxis label={{ value: 'Battery Level (%)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="value" stroke="#ffc658" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BatterySensor;
