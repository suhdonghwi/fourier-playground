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

function gcd(a: number, b: number): number {
  if (!b) return b === 0 ? a : NaN;
  return gcd(b, a % b);
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

  let period: number;
  if (unitCircles.every((c) => c.coefficient === 0)) {
    period = -1;
  } else {
    period = period =
      (2 /
        unitCircles
          .map((c) => c.coefficient)
          .filter((coeff) => coeff > 0)
          .reduce(gcd)) *
      2 *
      Math.PI;
  }

  function resize(p5: p5Types) {
    trail = [];
    theta = 0;

    if (p5.windowWidth <= 840) {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight / 2);
    } else {
      p5.resizeCanvas(p5.windowWidth / 2, p5.windowHeight - 3);
    }
  }

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(p5.windowWidth / 2, p5.windowHeight - 3).parent(
      canvasParentRef
    );
    resize(p5);
    p5.strokeWeight(2);
  };

  const draw = (p5: p5Types) => {
    p5.background(240);

    if (!config.isGraphMode) {
      p5.textSize(25);
      p5.fill(150);
      p5.noStroke();
      p5.text("아무 도형이나 그려보세요!", p5.width / 2 - 125, 50);
    }

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
      if (theta <= period) trail.push(point);
    }

    p5.beginShape();
    p5.stroke(255, 0, 0);
    p5.noFill();

    if (config.drawTrail) {
      let lastOffIndex = 0;

      for (let i = 0; i < trail.length; i++) {
        if (trail[i].x > p5.width) {
          lastOffIndex = i;
        }

        p5.curveVertex(trail[i].x, trail[i].y);
        if (config.isGraphMode) trail[i].x += 2;
      }

      trail.splice(0, lastOffIndex);
    }

    p5.endShape();
    p5.fill(0);
    p5.noStroke();
    p5.ellipse(point.x, point.y, 7, 7);

    theta += config.thetaDelta;
  };

  return <Sketch setup={setup} draw={draw} windowResized={resize} />;
}
