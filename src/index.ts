import * as p5 from 'p5'
import { ColigWidget } from './widgets/ColigWidget'
import { InputSwitchElement } from './elements/InputSwitch'
import { EventHandler } from './eventHandlers/EventHandler'
import { DragAndDrop } from './eventHandlers/DragAndDrop'
import { NewConnector } from './eventHandlers/NewConnector'
import { AndGateElement } from './elements/AndGate'
import { NotGateElement } from './elements/NotGate'
import { OutputLightElement } from './elements/OutputLight'
import { ToggleSwitchHandler } from './eventHandlers/ToggleSwitchHandler'


function main(p: p5) {
    const widgets: ColigWidget[] = []
    const eventHandlers: EventHandler[] = []

    p.setup = () => {
        p.createCanvas(800, 600)
        widgets.push(new InputSwitchElement({ x: 200, y: 200 }))
        widgets.push(new AndGateElement({ x: 500, y: 400 }))
        widgets.push(new NotGateElement({ x: 200, y: 500 }))
        widgets.push(new OutputLightElement({ x: 500, y: 500, lightOn: false }))

        eventHandlers.push(new ToggleSwitchHandler(widgets))
        eventHandlers.push(new NewConnector(widgets))
        eventHandlers.push(new DragAndDrop(widgets))
        p.strokeWeight(0)
    }

    p.draw = () => {
        p.background(220)
        widgets.forEach(shape => shape.draw(p))
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
        widgets.forEach((view: ColigWidget) => view.handleMouseClickEvent(p))
    }
}

export const myp5 = new p5(main, document.body);

// TODO: Comment code