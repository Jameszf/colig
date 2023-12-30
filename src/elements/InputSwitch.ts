import { Rectangle } from "../widgets/Rectangle"
import { Triangle } from "../widgets/Triangle"
import { WidgetFactory } from "../widgets/WidgetFactory"
import { ColigElement } from "./ColigElement"
import { ColigLogic } from "./ColigLogic"


export type InputSwitchParams = {
    x: number,
    y: number
}

export class InputSwitch extends ColigLogic {
    switchState: boolean

    constructor() {
        super(0, 1, [], [])
        this.switchState = false
    }

    protected override compute(): boolean[] {
        return [this.switchState]
    }

    public setState(newState: boolean) {
        this.switchState = newState
    }

    public getState(): boolean {
        return this.switchState
    }
}

export class InputSwitchElement extends ColigElement {
    static recLength: number = 60
    static btnRadius: number = 26
    state: InputSwitchParams 
    logic: InputSwitch

    constructor(state: InputSwitchParams) {
        super()
        this.state = state

        const { x, y } = this.state
        const [ recLength, btnRadius ] = [ InputSwitchElement.recLength, InputSwitchElement.btnRadius ]
        const padding = (recLength - btnRadius * 2) / 2
        const [ x3, y3 ] = [ 
            x + InputSwitchElement.recLength * 3 / 2, 
            y + InputSwitchElement.recLength / 2 
        ] // Third triangle point.

        this.subWidgets = [
            new Rectangle({x, y, width: recLength, height: recLength, color: "#212121"}),
            new Triangle({ x: x + recLength, y, x2: x + recLength, y2: y + recLength, x3, y3, color: "#929392" }),
            WidgetFactory.ConnectorPort(x + recLength * 3 / 2, y + recLength / 2),
            WidgetFactory.Circle(x + padding + btnRadius, y + padding + btnRadius, btnRadius, "#111111")
        ]
        this.logic = new InputSwitch()
    }

    public override draw(p: p5) {
        if (this.logic.getState()) {
            this.subWidgets[3].setState({ color: "#53b252" })
        } else {
            this.subWidgets[3].setState({color: "#b74035"})
        }
        super.draw(p)
    }

    public isPort(x: number, y: number): boolean {
        return this.subWidgets[2].isClicked(x, y)
    }

    public isToggled(mx: number, my: number): boolean {
        return this.subWidgets[3].isClicked(mx, my)
    }
}