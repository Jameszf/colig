import * as p5 from 'p5'
import { ColigWidget } from './widgets/ColigWidget'
import { ToggleButtonWidget } from './widgets/ToggleButton'
import { InputSwitchElement } from './elements/InputSwitch'
import { EventHandler } from './eventHandlers/EventHandler'
import { DragAndDrop } from './eventHandlers/DragAndDrop'
import { NewConnector } from './eventHandlers/NewConnector'
import { AndGateElement } from './elements/AndGate'
import { NotGateElement } from './elements/NotGate'
import { OutputLightElement } from './elements/OutputLight'


function main(p: p5) {
    const views: ColigWidget[] = []
    const eventHandlers: EventHandler[] = []
    let selected: ColigWidget
    let selectedDx: number
    let selectedDy: number

    p.setup = () => {
        p.createCanvas(800, 600)
        views.push(new ToggleButtonWidget({ x: 400, y: 400, radius: 25, lightOn: false }))
        views.push(new InputSwitchElement({ x: 200, y: 200 }))
        views.push(new AndGateElement({ x: 500, y: 400 }))
        views.push(new NotGateElement({ x: 200, y: 500 }))
        views.push(new OutputLightElement({ x: 500, y: 500, lightOn: false }))

        eventHandlers.push(new NewConnector(views))
        eventHandlers.push(new DragAndDrop(views))
        p.strokeWeight(0)
    }

    p.draw = () => {
        p.background(220)
        views.forEach(shape => shape.draw(p))
    }

    p.mouseReleased = () => {
        for (let handler of eventHandlers) {
            if (handler.onMouseRelease(p)) {
                break
            }
        }
    }

    p.mouseDragged = () => {
        for (let handler of eventHandlers) {
            if (handler.onMouseDrag(p)) {
                break
            }
        }
    }

    p.mouseMoved = () => {
        for (let handler of eventHandlers) {
            if (handler.onMouseMove(p)) {
                break
            }
        }
    }

    p.mousePressed = () => {
        for (let handler of eventHandlers) {
            if (handler.onMousePress(p)) {
                break
            }
        }
        views.forEach((view: ColigWidget) => view.handleMouseClickEvent(p))
    }
}

export const myp5 = new p5(main, document.body);

// TODO: Comment code