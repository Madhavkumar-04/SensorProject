const express = require('express');
const mongoose = require('mongoose');
const { format, subMonths, subYears, subWeeks, startOfMonth, startOfYear, startOfWeek, startOfDay, startOfHour, addMinutes, subHours, subDays } = require('date-fns');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

// Connect to MongoDB
// mongoose.connect('mongodb+srv://Delote:eeeee@clustedee.t673u.mongodb.net/dashboard', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));

// // Define a schema and model for sensor data
// const sensorDataSchema = new mongoose.Schema({
//     sensorType: String,
//     timestamp: Date,
//     value: Number
// });

// const SensorData = mongoose.model('SensorData', sensorDataSchema);

// Helper function to calculate start time based on range
const getStartTime = (range) => {
    const now = new Date();
    switch (range) {
        case '43200': // 1 Month (30 days)
            return startOfMonth(subMonths(now, 1));
        case '525600': // 1 Year
            return startOfYear(subYears(now, 1));
        case '10080': // 1 Week
            return startOfWeek(subWeeks(now, 1));
        case '1440': // 1 Day
            return startOfDay(subDays(now, 1));
        case '180': // 3 Hours
            return startOfHour(subHours(now, 3));
        default: // Default to 1 Hour
            return startOfHour(subHours(now, 1));
    }
};

// Helper function to generate data points based on range
const generateData = (sensorType, range, generateValue) => {
    const data = [];
    const endTime = new Date();
    const startTime = getStartTime(range);
    let currentTime = startTime;
    let intervalMillis;

    // Determine the interval based on the range
    if (range === '43200') { // 1 Month (30 days)
        intervalMillis = 2 * 24 * 60 * 60 * 1000; // 2 Days
    } else if (range === '525600') { // 1 Year
        intervalMillis = 30 * 24 * 60 * 60 * 1000; // 1 Month
    } else if (range === '10080') { // 1 Week
        intervalMillis = 24 * 60 * 60 * 1000; // 1 Day
    } else if (range === '1440') { // 1 Day
        intervalMillis = 60 * 60 * 1000; // 1 Hour
    } else if (range === '180') { // 3 Hours
        intervalMillis = 30 * 60 * 1000; // 30 Minutes
    } else { // Default to 1 Hour
        intervalMillis = 15 * 60 * 1000; // 15 Minutes
    }

    while (currentTime <= endTime) {
        const entry = {
            sensorType,
            timestamp: currentTime,
            value: generateValue(),
        };
        data.push(entry);
        currentTime = new Date(currentTime.getTime() + intervalMillis); // Increment based on interval
    }

    return data;
};

// Routes for different sensors
app.get('/api/:sensor', async (req, res) => {
    const { sensor } = req.params;
    const { range } = req.query;

    let generateValue;
    switch (sensor) {
        case 'internetSensor':
            generateValue = () => Math.floor(Math.random() * 100); // Example: Internet speed in Mbps
            break;
        case 'motionSensor':
            generateValue = () => (Math.random() > 0.5 ? 1 : 0); // 1 for motion detected, 0 for no motion
            break;
        case 'latencySensor':
            generateValue = () => Math.floor(Math.random() * 100) + 100; // Latency in ms
            break;
        case 'batterySensor':
            generateValue = () => Math.floor(Math.random() * 50) + 50; // Battery level in percentage
            break;
        default:
            return res.status(400).json({ error: 'Invalid sensor type' });
    }

    // Delete existing data for the sensor
    // await SensorData.deleteMany({ sensorType: sensor });

    // Generate new data and insert into the database
    const newData = generateData(sensor, range, generateValue);
    // await SensorData.insertMany(newData);
    // const data = await SensorData.find({ sensorType: sensor });
    res.json(newData);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
