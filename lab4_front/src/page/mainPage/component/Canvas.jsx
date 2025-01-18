import React, {useRef, useEffect} from "react";
import "../../../style/component/Canvas.css";
import {checkHit} from "../../../hitCheck.js";

const CanvasComponent = ({r, points, onCanvasClick, isDarkMode}) => {
    const canvasRef = useRef(null);

    const scaleRis = 30;
    const padding = 5;
    const centerX = 200;
    const centerY = 200;

    const getCssVariable = (variableName) => {
        return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
    };

    const drawAxes = (ctx) => {
        const axisColor = getCssVariable("--axis-color");
        const textColor = getCssVariable("--text-color");

        ctx.strokeStyle = axisColor;
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(400 - padding, centerY);
        ctx.moveTo(400 - padding - 10, centerY - 5);
        ctx.lineTo(400 - padding, centerY);
        ctx.lineTo(400 - padding - 10, centerY + 5);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX, 400);
        ctx.lineTo(centerX, padding);
        ctx.moveTo(centerX - 5, padding + 5);
        ctx.lineTo(centerX, padding);
        ctx.lineTo(centerX + 5, padding + 5);
        ctx.stroke();

        ctx.font = "16px Arial";
        ctx.fillStyle = textColor;
        ctx.fillText("x", 400 - 12, centerY - 7);
        ctx.fillText("y", centerX + 7, 12);

        drawTicks(ctx);
    };

    const drawTicks = (ctx) => {
        const axisColor = getCssVariable("--axis-color");

        ctx.strokeStyle = axisColor;
        ctx.lineWidth = 1;

        for (let i = -scaleRis * 5; i <= scaleRis * 5; i += scaleRis) {
            ctx.beginPath();
            ctx.moveTo(centerX + i, centerY);
            ctx.lineTo(centerX + i, centerY - 5);
            ctx.stroke();
        }

        for (let i = -scaleRis * 5; i <= scaleRis * 5; i += scaleRis) {
            ctx.beginPath();
            ctx.moveTo(centerX, centerY + i);
            ctx.lineTo(centerX - 5, centerY + i);
            ctx.stroke();
        }
    };

    const drawShapes = (ctx, R) => {
        const shapeFill = getCssVariable("--shape-fill");
        const axisColor = getCssVariable("--axis-color");

        ctx.fillStyle = shapeFill;
        ctx.strokeStyle = axisColor;

        ctx.beginPath();
        ctx.arc(centerX, centerY, R, -Math.PI / 2, Math.PI, true);
        ctx.lineTo(centerX, centerY);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.rect(centerX, centerY, R, -R);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX, centerY + R / 2);
        ctx.lineTo(centerX + R, centerY);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    };

    const drawPoint = (ctx, x, y, r) => {
        const pointHitColor = getCssVariable("--point-hit-color");
        const pointMissColor = getCssVariable("--point-miss-color");

        ctx.beginPath();
        ctx.arc(
            centerX + scaleRis * x,
            centerY - scaleRis * y,
            3,
            0,
            2 * Math.PI
        );
        ctx.fillStyle = checkHit(x, y, r) ? pointHitColor : pointMissColor;
        ctx.closePath();
        ctx.fill();
    };

    const redrawCanvas = (ctx, isDarkMode) => {
        const axisColor = isDarkMode
            ? getComputedStyle(document.documentElement).getPropertyValue("--axis-color-dark").trim()
            : getComputedStyle(document.documentElement).getPropertyValue("--axis-color-light").trim();

        const shapeFill = isDarkMode
            ? getComputedStyle(document.documentElement).getPropertyValue("--shape-fill-dark").trim()
            : getComputedStyle(document.documentElement).getPropertyValue("--shape-fill-light").trim();

        ctx.clearRect(0, 0, 400, 400);
        ctx.strokeStyle = axisColor;
        drawAxes(ctx);

        if (r > 0) {
            ctx.fillStyle = shapeFill;
            drawShapes(ctx, scaleRis * r);
        }

        points.forEach((point) => drawPoint(ctx, point.x, point.y, r));
    };


    const handleClick = (e) => {
        const rect = e.target.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        onCanvasClick(clickX, clickY);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (ctx) {
            requestAnimationFrame(() => {
                redrawCanvas(ctx, isDarkMode);
                canvas.style.border = `1px solid ${getCssVariable("--axis-color")}`;

            });
        }
    }, [isDarkMode, points, r]);


    return (
        <canvas
            ref={canvasRef}
            width={400}
            height={400}
            onClick={handleClick}
            style={{border: `1px solid ${getCssVariable("--axis-color")}`}}
        />
    );
};

export default CanvasComponent;
