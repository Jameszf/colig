import * as p5 from 'p5'
import { Circle, Rectangle, Drawable } from "./drawable"


function main(p: p5) {
    let shapes: Drawable[] = []

    function randInt(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min)
    }

    function addShapes(num: number) {
        for (let i = 0; i < num; i++) {
            shapes.push(new Circle(randInt(0, 1250), randInt(0, 700), randInt(5, 80), p.color(10)))
        }
    }

    p.setup = () => {
        p.createCanvas(1280, 720)
    }

    p.draw = () => {
        p.background(220)
        for (let shape of shapes) {
            shape.draw(p)
        }
    }

    p.mouseClicked = () => {
        shapes = []
        addShapes(100)
    }
}

export const myp5 = new p5(main, document.body);
