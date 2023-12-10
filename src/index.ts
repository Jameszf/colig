import * as p5 from 'p5'
import { ColigWidget } from './widgets/ColigWidget'
import { ToggleButtonWidget } from './widgets/ToggleButton'
import { InputSwitchWidget } from './widgets/InputSwitch'
import { AndGateWidget } from './widgets/AndGateWidget'
import { NotGateWidget } from './widgets/NotGateWidget'


function main(p: p5) {
    const views: ColigWidget[] = []
    let state = false
    let selected: ColigWidget
    let selectedDx: number
    let selectedDy: number

    p.setup = () => {
        p.createCanvas(800, 600)
        views.push(new ToggleButtonWidget({x: 400, y: 400, radius: 25, lightOn: false}))
        views.push(new InputSwitchWidget({ x: 400, y: 200, lightOn: false }))
        views.push(new InputSwitchWidget({x: 200, y: 200, lightOn: false}))
        views.push(new AndGateWidget({ x: 500, y: 400 }))
        views.push(new NotGateWidget({ x: 200, y: 500 }))
    }

    p.draw = () => {
        p.background(220)
        views.forEach(shape => shape.draw(p))
    }

    p.mouseReleased = () => {
        selected = undefined
        selectedDx = 0
        selectedDy = 0
    }

    p.mouseDragged = () => {
        if (selected != undefined) {
            selected.move(p.mouseX - selectedDx, p.mouseY - selectedDy)
        }
    }

    p.mousePressed = () => {
        for (let view of views) {
            if (view.isClicked(p.mouseX, p.mouseY)) {
                selected = view
                selectedDx = p.mouseX - selected.getX()
                selectedDy = p.mouseY - selected.getY()
                break
            }
        }

        views.forEach((view: ColigWidget) => view.handleMouseClickEvent(p))
    }
}

export const myp5 = new p5(main, document.body);

// TODO: Comment code