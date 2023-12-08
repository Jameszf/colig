import * as p5 from 'p5'
import { Circle, Rectangle, Shape } from "./drawable"
import { ToggleButtonView } from "./elements"


function main(p: p5) {
    const shapes: Shape[] = []
    const button: ToggleButtonView = new ToggleButtonView(25, 400, 400)
    let state = false
    const x = 200, y = 200, radius = 26


    p.setup = () => {
        p.createCanvas(800, 600)
        shapes.push(new Rectangle(x, y, 60, 60, "#212121"))
        shapes.push(new Circle(x + radius + 4, y + radius + 4, radius, "#53b252"))
        shapes.push(new Circle(x + 90, y + 30, 10, "#ffffff"))
    }

    p.draw = () => {
        p.background(220)
        p.fill("#929392")
        p.triangle(x + 60, y, x + 60, y + 60, x + 90, y + 30)
        shapes.forEach(shape => shape.draw(p))
        button.draw(p)
    }

    p.mousePressed = () => {
        state = !state
        button.setParams({ lightOn: state })
    }
}

export const myp5 = new p5(main, document.body);
