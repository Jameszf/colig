import { Rectangle } from "../widgets/Rectangle"
import { Triangle } from "../widgets/Triangle"
import { ConnectorPort } from "./ConnectorPort"
import { WidgetFactory } from "../widgets/WidgetFactory"
import { ColigElement } from "./ColigElement"
import { ColigLogic } from "./ColigLogic"


export type OutputLightState = {
    x: number,
    y: number,
    lightOn: boolean
}

export class OutputLight extends ColigLogic {
    logicalValue: boolean

    constructor() {
        super(1, 1, [], [])
        this.logicalValue = false
    }

    protected override compute(): boolean[] {
        return [this.inputs[0]]
    }

    public getLogicalValue(): boolean {
        return this.logicalValue
    }

    public setLogicalValue(newValue: boolean): void {
        this.logicalValue = newValue
    }
}

export class OutputLightElement extends ColigElement {
    static recLength = 60
    static btnRadius = 26
    state: OutputLightState
    logic: OutputLight

    constructor(state: OutputLightState) {
        super()
        this.state = state
        const { x, y } = this.state
        const [ recLength, btnRadius ] = [ OutputLightElement.recLength, OutputLightElement.btnRadius ]
        const padding = (recLength - btnRadius * 2) / 2
        this.subWidgets = [
            new Rectangle({ x, y, width: recLength, height: recLength, color: "#111111" }),
            WidgetFactory.Circle(x + btnRadius + padding, y + btnRadius + padding, btnRadius, "#929392"),
            new Triangle({ x, y, x2: x, y2: y + recLength, x3: x - recLength / 2, y3: y + recLength / 2, color: "#111111" }),
            WidgetFactory.ConnectorPort(x - recLength / 2, y + recLength / 2)
        ]
        this.logic = new OutputLight()
    }

    public override draw(p: p5) {
        if (this.logic.getLogicalValue()) {
            this.subWidgets[1].setState({ color: "#53b252" })
        } else {
            this.subWidgets[1].setState({color: "#b74035"})
        }
        super.draw(p)
    }
}