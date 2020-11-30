import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";

import Point from "../types/Point";
import UnitCircle from "../types/UnitCircle";
import { Config } from "./ConfigGrid";

interface CanvasProps {
  unitCircles: UnitCircle[];
  config: Config;
  onDrawFinish: (drawing: Point[]) => void;
}

export default function Canvas({
  unitCircles,
  config,
  onDrawFinish,
}: CanvasProps) {
  let theta = 0;
  let trail: Point[] = [];

  const drawing: Point[] = [];
  let pressed = false;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(p5.windowWidth / 2, p5.windowHeight - 3).parent(
      canvasParentRef
    );
    p5.strokeWeight(2);
  };

  const draw = (p5: p5Types) => {
    p5.background(240);

    if (p5.mouseIsPressed && p5.mouseX <= p5.width && p5.mouseY <= p5.height) {
      pressed = true;
      trail.length = 0;

      drawing.push({
        x: p5.mouseX - p5.width / 2,
        y: p5.height / 2 - p5.mouseY,
      });

      p5.beginShape();
      p5.stroke(255, 0, 0);
      p5.noFill();
      for (const point of drawing) {
        if (point.x <= p5.windowWidth) {
          p5.curveVertex(point.x + p5.width / 2, -point.y + p5.height / 2);
        }
      }
      p5.endShape();

      return;
    } else if (pressed) {
      pressed = false;
      onDrawFinish([...drawing]);
      drawing.length = 0;
    }

    p5.noFill();
    p5.stroke(200);

    const startPoint = config.isGraphMode
      ? { x: 100, y: p5.height / 2 }
      : { x: p5.width / 2, y: p5.height / 2 };
    let prevPoint = startPoint;
    for (const circle of unitCircles) {
      p5.ellipse(
        prevPoint.x,
        prevPoint.y,
        circle.radius * 2,
        circle.radius * 2
      );
      prevPoint = {
        x:
          prevPoint.x +
          circle.radius * Math.cos(circle.phi + circle.coefficient * theta),
        y:
          prevPoint.y -
          circle.radius * Math.sin(circle.phi + circle.coefficient * theta),
      };
    }

    const point = prevPoint;

    if (config.isGraphMode) {
      const trailPoint = {
        x: Math.min(
          startPoint.x +
            unitCircles.map((c) => c.radius).reduce((v1, v2) => v1 + v2, 0),
          p5.width / 2
        ),
        y: point.y,
      };

      p5.noFill();
      p5.stroke(200);
      p5.line(point.x, point.y, trailPoint.x, trailPoint.y);

      p5.fill(0);
      p5.noStroke();
      p5.ellipse(trailPoint.x, trailPoint.y, 7, 7);

      trail.push(trailPoint);
    } else {
      trail.push(point);
    }

    p5.beginShape();
    p5.stroke(255, 0, 0);
    p5.noFill();

    if (config.drawTrail) {
      for (const point of trail) {
        p5.curveVertex(point.x, point.y);
        if (config.isGraphMode) point.x += 2;
      }
      trail = trail.filter((p) => p.x <= p5.width);
    }

    p5.endShape();
    p5.fill(0);
    p5.noStroke();
    p5.ellipse(point.x, point.y, 7, 7);

    theta += config.thetaDelta;
  };

  return <Sketch setup={setup} draw={draw} />;
}
