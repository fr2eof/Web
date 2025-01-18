import React, { useState, useEffect, useRef } from "react";
import "../../../style/component/Clicker.css";

const Clicker = () => {
    const [score, setScore] = useState(0);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [timer, setTimer] = useState(null);
    const containerRef = useRef(null); 

    
    const getRandomPosition = () => {
        if (!containerRef.current) return { x: 0, y: 0 };

        const container = containerRef.current;
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        
        const maxX = containerWidth - 100;
        const maxY = containerHeight - 50;

        const x = Math.random() * maxX;
        const y = Math.random() * maxY;

        return { x, y };
    };

    
    const moveButton = () => {
        setPosition(getRandomPosition());
    };

    
    const handleMouseEnter = () => {
        setTimer(setTimeout(moveButton, 200));
    };

    
    const handleClick = () => {
        clearTimeout(timer); 
        setScore(score + 1); 
        moveButton(); 
    };

    
    useEffect(() => {
        return () => clearTimeout(timer);
    }, [timer]);

    return (
        <div className="clicker-container" ref={containerRef}>
            <h1>Clicks: {score}</h1>
            <button
                className="fun-button"
                style={{ left: position.x, top: position.y }}
                onMouseEnter={handleMouseEnter}
                onClick={handleClick}
            >
                Try it!
            </button>
        </div>
    );
};

export default Clicker;