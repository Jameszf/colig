import { Rectangle } from "../widgets/Rectangle";
import { TextWidget } from "../widgets/TextWidget";
import { WidgetFactory } from "../widgets/WidgetFactory";
import { ColigElement } from "./ColigElement";
import { ColigLogic } from "./ColigLogic";


export type AndGateElementState = {
    x: number,
    y: number
}

export class ANDGate extends ColigLogic {
    constructor() {
        super(2, 1, [], [])
    }

    protected override compute(): boolean[] {
        return [this.inputs[0] && this.inputs[1]]
    }
}

export class AndGateElement extends ColigElement {
    static recWidth: number = 90
    static recHeight: number = 60

    constructor(state: AndGateElementState) {
        super()
        this.state = state
        const { x, y } = this.state
        const [ recWidth, recHeight ] = [ AndGateElement.recWidth, AndGateElement.recHeight ]
        this.subWidgets = [
            new Rectangle({ x, y, width: recWidth, height: recHeight, color: "#111111" }),
            WidgetFactory.ConnectorPort(x, y + 15),
            WidgetFactory.ConnectorPort(x, y + recHeight - 15),
            WidgetFactory.ConnectorPort(x + recWidth, y + recHeight / 2),
            new TextWidget({ x: x + 18, y: y + 37, str: "AND", fontSize: 26 })
        ]
        this.logic = new ANDGate()
    }

    public isPort(x: number, y: number): boolean {
        return this.subWidgets[1].isClicked(x, y) ||
            this.subWidgets[2].isClicked(x, y) ||
            this.subWidgets[3].isClicked(x, y)
    }
}