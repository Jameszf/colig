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

        const [ x3, y3 ] = [ 
            InputSwitchWidget.recLength * 2 / 3, 
            InputSwitchWidget.recLength / 2 
        ] // Third triangle point.

        this.subWidgets = [
            new Rectangle({x: 0, y: 0, width: InputSwitchWidget.recLength, height: InputSwitchWidget.recLength, color: "#212121"}),
            new Triangle({ x: 0, y: 0, x2: 0, y2: InputSwitchWidget.recLength, x3, y3, color: "#929392" }),
            new Circle({x: 0, y: 0, radius: 10, color: "#ffffff"}),
            new ToggleButtonWidget({ x: 0, y: 0, radius: InputSwitchWidget.btnRadius, lightOn: state.lightOn })
        ]
        this.move(state.x, state.y)
    }

    public override move(newX: number, newY: number): void {
        const [ recLength, btnRadius ] = [ InputSwitchWidget.recLength, InputSwitchWidget.btnRadius ]
        const padding = (recLength - btnRadius * 2) / 2

        this.subWidgets[0].move(newX, newY)
        this.subWidgets[1].move(newX + recLength, newY)
        this.subWidgets[2].move(newX + InputSwitchWidget.recLength * 3 / 2, newY + InputSwitchWidget.recLength / 2 )
        this.subWidgets[3].move(newX + padding, newY + padding)
        this.setState({ x: newX, y: newY })
    }

    /*
    public override isClicked(cx: number, cy: number): boolean {
        return this.subWidgets[3].isClicked(cx, cy) // Only care if ToggleButtonWidget is clicked.
    }
    */

    public override setState(newParams: InputSwitchParams): void {
        this.state = { ...this.state, ...newParams }
        if (newParams["lightOn"] != undefined) {
            // Updates ToggleButtonWidget's state.
            this.subWidgets[3].setState({ lightOn: newParams.lightOn })
        }
    }
}