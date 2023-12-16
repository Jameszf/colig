import { Circle } from "./Circle";
import { ColigWidget } from "./ColigWidget";
import { ConnectorPort } from "./ConnectorPort";
import { Rectangle } from "./Rectangle";
import { TextWidget } from "./TextWidget";


export type NotGateWidgetState = {
    x: number,
    y: number
}

export class NotGateWidget extends ColigWidget {
    static recWidth: number = 90
    static recHeight: number = 60
    state: NotGateWidgetState

    constructor(state: NotGateWidgetState) {
        super()
        this.state = state
        const { x, y } = this.state
        const [ recWidth, recHeight ] = [ NotGateWidget.recWidth, NotGateWidget.recHeight ]
        this.subWidgets = [
            new Rectangle({ x, y, width: recWidth, height: recHeight, color: "#111111" }),
            new ConnectorPort({ x, y: y + recHeight / 2, radius: 10 }),
            new ConnectorPort({ x: x + recWidth, y: y + recHeight / 2, radius: 10 }),
            new TextWidget({ x: x + 18, y: y + 37, str: "NOT", fontSize: 26 })
        ]
    }
}