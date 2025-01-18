import React, {useState, useEffect} from "react";

function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerID = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timerID);
        };
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };

    return <span>{formatTime(time)}</span>;
};

export default Clock;