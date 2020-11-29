import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";

import Point from "../types/Point";
import UnitCircle from "../types/UnitCircle";

interface CanvasProps {
  unitCircles: UnitCircle[];
}

export default function Canvas({ unitCircles }: CanvasProps) {
  let theta = 0;
  const thetaDelta = 0.05;
  const trail: Point[] = [];

  const startPoint = { x: 200, y: 300 };

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

    let prevPoint = startPoint;
    for (const circle of unitCircles) {
      p5.ellipse(
        prevPoint.x,
        prevPoint.y,
        circle.radius * 2,
        circle.radius * 2
      );
      prevPoint = {
        x: prevPoint.x + circle.radius * Math.cos(circle.coefficient * theta),
        y: prevPoint.y - circle.radius * Math.sin(circle.coefficient * theta),
      };
    }

    const point = prevPoint;
    const trailPoint = {
      x:
        startPoint.x +
        unitCircles.map((c) => c.radius).reduce((v1, v2) => v1 + v2),
      y: point.y,
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
      if (point.x <= p5.windowWidth) {
        p5.curveVertex(point.x, point.y);
        point.x += 2;
      }
    }
    p5.endShape();

    theta += thetaDelta;
  };

  return <Sketch setup={setup} draw={draw} />;
}
