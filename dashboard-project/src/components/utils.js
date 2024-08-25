import { addMinutes, subMinutes, subHours, subDays, subWeeks, startOfHour, startOfDay, startOfWeek, format, startOfYear, startOfMonth, subYears, subMonths } from 'date-fns';

export const getTickValues = (range) => {
    const endTime = new Date();
    let startTime;
    let intervalMillis;

    switch (range) {
        case 525600: // 1 Year
            startTime = startOfYear(subYears(endTime, 1));
            intervalMillis = 30 * 24 * 60 * 60 * 1000; // 1 Month
            break;
        case 43200: // 1 Month
            startTime = startOfMonth(subMonths(endTime, 1));
            intervalMillis = 2 * 24 * 60 * 60 * 1000; // 1 Day
            break;
        case 10080: // 1 Week
            startTime = startOfWeek(subWeeks(endTime, 1));
            intervalMillis = 24 * 60 * 60 * 1000; // 1 Day
            break;
        case 1440: // 1 Day
            startTime = startOfDay(subDays(endTime, 1));
            intervalMillis = 60 * 60 * 1000; // 1 Hour
            break;
        case 180: // 3 Hours
            startTime = startOfHour(subHours(endTime, 3));
            intervalMillis = 30 * 60 * 1000; // 30 Minutes
            break;
        default: // Default to 1 Hour
            startTime = startOfHour(subHours(endTime, 1));
            intervalMillis = 15 * 60 * 1000; // 15 Minutes
            break;
    }

    const ticks = [];
    for (let time = startTime; time <= endTime; time = new Date(time.getTime() + intervalMillis)) {
        ticks.push(time.toISOString());
    }

    return ticks;
};


export const formatXAxis = (timestamp, range) => {
    const date = new Date(timestamp);
    switch (range) {
        case 525600: // 1 Year
            return format(date, 'MMM'); // Display month and year
        case 43200: // 1 Month
            return format(date, 'd MMM'); // Display day and month
        case 10080: // 1 Week
            return format(date, 'd MMM'); // Display day and month
        case 1440: // 1 Day
            return format(date, 'HH'); // Display only the hour
        default: // 1 Hour, 3 Hours
            return format(date, 'HH:mm'); // Display hour and minute
    }
};


