import * as p5 from 'p5'
import { Circle, Rectangle, Drawable, ANDGate } from "./drawable"


function main(p: p5) {
    let ANDs: ANDGate[] = []

    p.setup = () => {
        p.createCanvas(800, 600)
        ANDs.push(new ANDGate(200, 200))
    }

    p.draw = () => {
        p.background(220)
        for (let el of ANDs) {
            el.draw(p)
        }
    }

    p.mousePressed = () => {
        for (let el of ANDs) {
            console.log(el.onMousePress(p))
        }
    }
}

export const myp5 = new p5(main, document.body);
