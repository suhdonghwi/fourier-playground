import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";

import Point from "../types/Point";

export default function Canvas() {
  let theta = 0;
  const thetaDelta = 0.05;
  const trail: Point[] = [];

  const circlePoint = {x: 200, y: 300};
  const circleRadius = 100;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(p5.windowWidth, 600).parent(canvasParentRef);
    p5.strokeWeight(2);
  };

  const draw = (p5: p5Types) => {
    p5.background(240);

    p5.noFill();
    p5.stroke(200);
    p5.ellipse(circlePoint.x, circlePoint.y, circleRadius * 2, circleRadius * 2);

    const point = {
      x: circlePoint.x + circleRadius * Math.cos(theta),
      y: circlePoint.y - circleRadius * Math.sin(theta),
    };
    const trailPoint = {
        x: circlePoint.x + circleRadius,
        y: point.y
    };

    p5.noFill();
    p5.stroke(200);
    p5.line(point.x, point.y, trailPoint.x, trailPoint.y);

    p5.fill(0);
    p5.noStroke();
    p5.ellipse(point.x, point.y, 7, 7);

    p5.fill(0);
    p5.noStroke();
    p5.ellipse(trailPoint.x, trailPoint.y, 7, 7);

    trail.push(trailPoint);

    p5.beginShape();
    p5.stroke(255, 0, 0);
    p5.noFill();
    for (const point of trail) {
        p5.curveVertex(point.x, point.y);
        point.x += 2;
    }
    p5.endShape();

    theta += thetaDelta;
  };

  return <Sketch setup={setup} draw={draw} />;
}
