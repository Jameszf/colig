import { ColigWidget } from "./ColigWidget";
import { Rectangle } from "./Rectangle";
import { Circle } from "./Circle"
import { TextWidget } from "./TextWidget";


export type AndGateWidgetState = {
    x: number,
    y: number
}

export class AndGateWidget extends ColigWidget {
    static recWidth: number = 90
    static recHeight: number = 60

    constructor(state: AndGateWidgetState) {
        super()
        this.state = state
        const { x, y } = this.state
        const [ recWidth, recHeight ] = [ AndGateWidget.recWidth, AndGateWidget.recHeight ]
        this.subWidgets = [
            new Rectangle({ x, y, width: recWidth, height: recHeight, color: "#111111" }),
            new Circle({ x, y: y + 15, radius: 10, color: "#dddddd" }),
            new Circle({ x, y: y + recHeight - 15, radius: 10, color: "#dddddd" }),
            new Circle({ x: x + recWidth, y: y + recHeight / 2, radius: 10, color: "#dddddd" }),
            new TextWidget({ x: x + 18, y: y + 37, str: "AND", fontSize: 26 })
        ]
    }
}