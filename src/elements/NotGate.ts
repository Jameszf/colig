import { Rectangle } from "../widgets/Rectangle";
import { TextWidget } from "../widgets/TextWidget";
import { WidgetFactory } from "../widgets/WidgetFactory";
import { ColigElement } from "./ColigElement";
import { ColigLogic } from "./ColigLogic";


export type NotGateElementState = {
    x: number,
    y: number
}


export class NOTGate extends ColigLogic {
    constructor() {
        super(1, 1, [], [])
    }

    protected override compute(): boolean[] {
        return [!this.inputs[0]]
    }
}


export class NotGateElement extends ColigElement {
    static recWidth: number = 90
    static recHeight: number = 60
    state: NotGateElementState
    logic: NOTGate

    constructor(state: NotGateElementState) {
        super()
        this.state = state
        const { x, y } = this.state
        const [ recWidth, recHeight ] = [ NotGateElement.recWidth, NotGateElement.recHeight ]
        this.subWidgets = [
            new Rectangle({ x, y, width: recWidth, height: recHeight, color: "#111111" }),
            WidgetFactory.ConnectorPort(x, y + recHeight / 2),
            WidgetFactory.ConnectorPort(x + recWidth, y + recHeight / 2),
            new TextWidget({ x: x + 18, y: y + 37, str: "NOT", fontSize: 26 })
        ]
    }

    public isPort(x: number, y: number): boolean {
        return this.subWidgets[1].isClicked(x, y) || this.subWidgets[2].isClicked(x, y)
    }
}