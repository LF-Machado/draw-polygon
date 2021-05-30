import React, { useEffect, useRef, useState } from "react";

function Canvas() {
  const canvasRef = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [currNode, setCurrNode] = useState(-1);

  const draw = ctx => {
    ctx.lineWidth = 6;
    ctx.fillStyle = "black";
    ctx.beginPath();
    if (nodes && currNode !== -1) {
      ctx.arc(nodes[currNode][0], nodes[currNode][1], 7, 0, 2 * Math.PI);
      ctx.fill();
      if (currNode === 0) ctx.stroke();
      if (currNode > 0) {
        ctx.moveTo(nodes[currNode - 1][0], nodes[currNode - 1][1]);
        ctx.lineTo(nodes[currNode][0], nodes[currNode][1]);
        ctx.stroke();
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    resizeCanvas(canvas);
    draw(ctx);
  }, [draw, nodes]);

  const handleMouseDown = mouseEvent => {
    const point = relativeCoordinates(mouseEvent);
    setCurrNode(currNode + 1);
    setNodes([...nodes, point]);
  };

  const relativeCoordinates = mouseEvent => {
    const canvas = canvasRef.current;
    const boundingRect = canvas.getBoundingClientRect();

    return [
      mouseEvent.clientX - boundingRect.left,
      mouseEvent.clientY - boundingRect.top,
    ];
  };

  const resizeCanvas = canvas => {
    const { width, height } = canvas.getBoundingClientRect();

    if (canvas.width !== width || canvas.height !== height) {
      const { devicePixelRatio: ratio = 1 } = window;
      const context = canvas.getContext("2d");
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.scale(ratio, ratio);
      return true;
    }

    return false;
  };

  const handleReset = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { width, height } = ctx.canvas;
    ctx.clearRect(0, 0, width, height);
    setNodes([]);
    setCurrNode(-1);
  };
  const handleComplete = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 5;
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(nodes[currNode][0], nodes[currNode][1]);
    ctx.lineTo(nodes[0][0], nodes[0][1]);
    ctx.stroke();
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{
          width: "500px",
          height: "500px",
          marginTop: "50px",
          backgroundColor: "slategray",
        }}
        onMouseDown={handleMouseDown}
      />
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleComplete}>Complete</button>
    </div>
  );
}

export default Canvas;
