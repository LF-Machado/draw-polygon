import React, { useEffect, useRef, useState } from "react";
import { Navbar, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Canvas() {
  const canvasRef = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [currNode, setCurrNode] = useState(-1);
  const [reset, setReset] = useState(false);
  const [complete, setComplete] = useState(true);

  const draw = (ctx, canvas) => {
    if (currNode === 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setComplete(false);
    }
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
    draw(ctx, canvas);
  }, [draw, nodes]);

  const handleMouseDown = mouseEvent => {
    const point = relativeCoordinates(mouseEvent);
    setCurrNode(currNode + 1);
    setNodes([...nodes, point]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.font = "bold 30px Arial";
    ctx.fillText(
      "Click to start drawing your polygon",
      canvas.width / 2 - 220,
      canvas.height / 2 + 8
    );
  }, [reset]);

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
    setReset(reset ? false : true);
    setComplete(true);
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
    setComplete(true);
  };

  return (
    <div>
      <Navbar
        collapseOnSelect
        bg="dark"
        variant="dark"
        className="m-auto align-self-center justify-content-between  "
        fixed="top"
      >
        <Navbar.Brand>Draw Polygon</Navbar.Brand>
        <Button className="m-3 btn-block" onClick={handleReset}>
          Reset
        </Button>
        <Button
          className="m-3 btn-block"
          onClick={handleComplete}
          disabled={complete}
        >
          Complete
        </Button>
      </Navbar>
      <canvas
        ref={canvasRef}
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(245, 245, 148, 0.993)",
        }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}

export default Canvas;
