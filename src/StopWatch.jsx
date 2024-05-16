import React, { useState, useRef, useEffect } from "react";

// StopWatch Component
// A stopwatch application that tracks and displays elapsed time, with start, stop, and reset functionalities.
function StopWatch() {
    // State to track if the stopwatch is running
    const [isRunning, setIsRunning] = useState(false);

    // State to track the elapsed time in milliseconds
    const [elapsedTime, setElapsedTime] = useState(0);

    // Ref to store the interval ID
    const intervalIdRef = useRef(null);

    // Ref to store the start time
    const startTimeRef = useRef(0);

    // useEffect to handle starting and stopping the interval
    useEffect(() => {
        if (isRunning) {
            // If the stopwatch is running, set an interval to update the elapsed time every 10 milliseconds
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }

        // Cleanup function to clear the interval
        return () => {
            clearInterval(intervalIdRef.current);
        };
    }, [isRunning]);

    // Function to start the stopwatch
    function start() {
        setIsRunning(true);
        // Set the start time to the current time minus the already elapsed time (to handle resume after pause)
        startTimeRef.current = Date.now() - elapsedTime;
    }

    // Function to stop the stopwatch
    function stop() {
        setIsRunning(false);
    }

    // Function to reset the stopwatch
    function reset() {
        setElapsedTime(0);
        setIsRunning(false);
    }

    // Function to format the elapsed time into a readable string
    function formatTime() {
        // Calculate hours, minutes, seconds, and milliseconds
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
        let seconds = Math.floor((elapsedTime / 1000) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);

        // Pad the values with leading zeros if necessary
        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");

        // Return the formatted time string
        return `${hours}:${minutes}:${seconds}:${milliseconds}`;
    }

    // Render the stopwatch component
    return (
        <div className="stopwatch">
            <div className="display">
                {formatTime()}
            </div>
            <div className="controls">
                <button onClick={start} className="start-button">Start</button>
                <button onClick={stop} className="stop-button">Stop</button>
                <button onClick={reset} className="reset-button">Reset</button>
            </div>
        </div>
    );
}

export default StopWatch;
