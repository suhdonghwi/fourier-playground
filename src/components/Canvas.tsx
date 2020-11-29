import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";

export default function Canvas() {
    let x = 50;
    const y = 50;
 
    const setup = (p5: p5Types, canvasParentRef: Element) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        p5.createCanvas(500, 500).parent(canvasParentRef);
    };
 
    const draw = (p5: p5Types) => {
        p5.background(0);
        p5.ellipse(x, y, 70, 70);
        x++;
    };
 
    return <Sketch setup={setup} draw={draw} />;
};
