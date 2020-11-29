import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";

import Point from "../types/Point";

export default function Canvas() {
  let theta = 0;
  const thetaDelta = 0.05;
  const trail: Point[] = [];

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(p5.windowWidth, 600).parent(canvasParentRef);
  };

  const draw = (p5: p5Types) => {
    p5.background(240);
    p5.ellipse(200, 300, 200, 200);

    const point = {
      x: 200 + 100 * Math.cos(theta),
      y: 300 - 100 * Math.sin(theta),
    };
    p5.ellipse(point.x, point.y, 10, 10);

    const trailPoint = {
        x: 300,
        y: point.y
    };
    p5.line(point.x, point.y, trailPoint.x, trailPoint.y);
    trail.push(trailPoint);

    for (const point of trail) {
        p5.ellipse(point.x, point.y, 5, 5);
        point.x += 2;
    }
    theta += thetaDelta;
  };

  return <Sketch setup={setup} draw={draw} />;
}
