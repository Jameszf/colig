import * as p5 from 'p5'
import { ColigWidget } from './widgets/ColigWidget'
import { ToggleButtonWidget } from './widgets/ToggleButton'
import { InputSwitchWidget } from './widgets/InputSwitch'


function main(p: p5) {
    const views: ColigWidget[] = []
    let state = false


    p.setup = () => {
        p.createCanvas(800, 600)
        views.push(new ToggleButtonWidget({x: 400, y: 400, radius: 25, lightOn: false}))
        views.push(new InputSwitchWidget({ x: 400, y: 200, lightOn: false }))
        views.push(new InputSwitchWidget({x: 200, y: 200, lightOn: false}))
    }

    p.draw = () => {
        p.background(220)
        views.forEach(shape => shape.draw(p))
    }

    p.mousePressed = () => {
        views.forEach((view: ColigWidget) => view.onMouseClick(p))
    }
}

export const myp5 = new p5(main, document.body);

// TODO: Comment code