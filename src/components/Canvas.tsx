import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";

export default function Canvas() {
    let theta = 0;
    const thetaDelta = 0.05;
 
    const setup = (p5: p5Types, canvasParentRef: Element) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        p5.createCanvas(p5.windowWidth, 600).parent(canvasParentRef);
    };
 
    const draw = (p5: p5Types) => {
        p5.background(240);
        p5.ellipse(200, 300, 200, 200);
        p5.ellipse(200 + 100 * Math.cos(theta), 300 - 100 * Math.sin(theta), 10, 10);
        theta += thetaDelta;
    };
 
    return <Sketch setup={setup} draw={draw} />;
};
