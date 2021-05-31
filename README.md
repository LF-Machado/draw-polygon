# Draw polygon app

## To run this app

### use `npm start`

Alternatively you can visit [this link](https://draw-polygon.vercel.app/) with the latest build deployed on vercel.

## Requirements

### 1. When users open the app, an empty canvas should be presented
### 2. There should be 2 buttons, one button to **complete** a polygon, another to **reset** the canvas content.
### 3. When the user clicks on the canvas, 
  - A vertex will be added in that location.
  - If there are any existing vertices, the new vertex should connect to the last added existing vertex with a polyline. 
  - When the user clicks the **complete** button, the last added vertex should connect to the first vertex and to form a polygon.
### 4. When the user clicks the reset button, all vertices should be cleared from the canvas.

![draw-polygon1](https://user-images.githubusercontent.com/66527610/120133748-56c3f180-c192-11eb-933a-edbc11867320.gif)
