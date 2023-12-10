import { Circle } from "./Circle"
import { ColigWidget } from "./ColigWidget"
import { Rectangle } from "./Rectangle"
import { ToggleButtonWidget } from "./ToggleButton"
import { Triangle } from "./Triangle"


export type InputSwitchParams = {
    x: number,
    y: number,
    lightOn?: boolean,
    callback?: Function
}

export class InputSwitchWidget extends ColigWidget {
    static recLength: number = 60
    static btnRadius: number = 26
    state: InputSwitchParams 

    constructor(state: InputSwitchParams) {
        super()
        this.state = state

        const { x, y, lightOn } = this.state
        const [ recLength, btnRadius ] = [ InputSwitchWidget.recLength, InputSwitchWidget.btnRadius ]
        const padding = (recLength - btnRadius * 2) / 2
        const [ x3, y3 ] = [ 
            x + InputSwitchWidget.recLength * 3 / 2, 
            y + InputSwitchWidget.recLength / 2 
        ] // Third triangle point.

        this.subWidgets = [
            new Rectangle({x, y, width: InputSwitchWidget.recLength, height: InputSwitchWidget.recLength, color: "#212121"}),
            new Triangle({ x: x + recLength, y, x2: x + recLength, y2: y + InputSwitchWidget.recLength, x3, y3, color: "#929392" }),
            new Circle({x: x + recLength * 3 / 2, y: y + recLength / 2, radius: 10, color: "#ffffff"}),
            new ToggleButtonWidget({ x: x + padding, y: y + padding, radius: InputSwitchWidget.btnRadius, lightOn })
        ]
        this.move(state.x, state.y)
    }

    public override setState(newParams: InputSwitchParams): void {
        this.state = { ...this.state, ...newParams }
        if (newParams["lightOn"] != undefined) {
            // Updates ToggleButtonWidget's state.
            this.subWidgets[3].setState({ lightOn: newParams.lightOn })
        }
    }
}