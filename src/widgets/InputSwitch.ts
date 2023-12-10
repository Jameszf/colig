import { Circle } from "./Circle"
import { ColigWidget } from "./ColigWidget"
import { Rectangle } from "./Rectangle"
import { ToggleButtonWidget } from "./ToggleButton"
import { Triangle } from "./Triangle"


export type InputSwitchParams = {
    x: number,
    y: number,
    lightOn: boolean,
    callback?: Function
}

export class InputSwitchWidget extends ColigWidget {
    state: InputSwitchParams 

    constructor(state: InputSwitchParams) {
        super()
        const { x, y, lightOn } = state
        const [ recLength, btnRadius ]  = [ 60, 26 ]
        const [ x3, y3 ] = [ Math.round(x + recLength * 3 / 2), Math.round(y + recLength / 2) ] // Third triangle point.
        const padding = (recLength - btnRadius * 2) / 2

        this.state = state
        this.subWidgets = [
            new Rectangle({x, y, width: recLength, height: recLength, color: "#212121"}),
            new Triangle({ x1: x + recLength, y1: y, x2: x + recLength, y2: y + recLength, x3, y3, color: "#929392" }),
            new Circle({x: x + 90, y: y + 30, radius: 10, color: "#ffffff"}),
            new ToggleButtonWidget({ x: x + padding, y: y + padding, radius: btnRadius, lightOn })
        ]
    }

    public override isClicked(cx: number, cy: number): boolean {
        return this.subWidgets[3].isClicked(cx, cy) // Only care if ToggleButtonWidget is clicked.
    }

    public override setState(newParams: InputSwitchParams): void {
        this.state = { ...this.state, ...newParams }
        if (newParams["lightOn"] != undefined) {
            // Updates ToggleButtonWidget's state.
            this.subWidgets[3].setState({ lightOn: newParams.lightOn })
        }
    }
}