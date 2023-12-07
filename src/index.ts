import * as p5 from 'p5'
import { Circle, Rectangle, Drawable } from "./drawable"


function main(p: p5) {
    p.setup = () => {
        p.createCanvas(800, 600)
    }

    p.draw = () => {
        p.background(220)
    }

    p.mousePressed = () => {
    }
}

export const myp5 = new p5(main, document.body);
