import * as p5 from 'p5'
import { Circle, Rectangle, ToggleButtonView, ColigView } from "./views"


function main(p: p5) {
    const views: ColigView[] = []
    let state = false
    const x = 200, y = 200, radius = 26


    p.setup = () => {
        p.createCanvas(800, 600)
        views.push(new Rectangle({x: x, y: y, width: 60, height: 60, color: "#212121"}))
        views.push(new Circle({x: x + radius + 4, y: y + radius + 4, radius: radius, color: "#53b252"}))
        views.push(new Circle({x: x + 90, y: y + 30, radius: 10, color: "#ffffff"}))
        views.push(new ToggleButtonView({x: 400, y: 400, radius: 25, lightOn: false}))
    }

    p.draw = () => {
        p.background(220)
        p.fill("#929392")
        p.triangle(x + 60, y, x + 60, y + 60, x + 90, y + 30)
        views.forEach(shape => shape.draw(p))
    }

    p.mousePressed = () => {
        state = !state
        views[3].setParams({ lightOn: state })
    }
}

export const myp5 = new p5(main, document.body);
