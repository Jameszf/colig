import * as p5 from 'p5'
import { Circle, Rectangle, ToggleButtonView, InputSwitchView, ColigView } from "./views"


function main(p: p5) {
    const views: ColigView[] = []
    let state = false


    p.setup = () => {
        p.createCanvas(800, 600)
        views.push(new ToggleButtonView({x: 400, y: 400, radius: 25, lightOn: false}))
        views.push(new InputSwitchView({ x: 400, y: 200, lightOn: false }))
        views.push(new InputSwitchView({x: 200, y: 200, lightOn: false}))
    }

    p.draw = () => {
        p.background(220)
        views.forEach(shape => shape.draw(p))
    }

    p.mousePressed = () => {
        state = !state
        views[0].setParams({ lightOn: state })
    }
}

export const myp5 = new p5(main, document.body);
