import { Circle } from "./Circle";
import { ColigWidget } from "./ColigWidget";


export type LogicalConnectorState = {
    x: number,
    y: number,
    x2: number,
    y2: number,
    color: string,
    weight: number
}

export class LogicalConnector extends ColigWidget {
    state: LogicalConnectorState

    constructor(state: LogicalConnectorState) {
        super()
        this.state = state
        this.subWidgets = [new Circle({ x: this.state.x, y: this.state.y, radius: 0, color: "#dbdbdb" })]
    }

    public override draw(p: p5): void {
        const { x, y, x2, y2, color, weight } = this.state
        p.stroke(color)
        p.strokeWeight(weight)
        p.line(x, y, x2, y2)
        this.subWidgets[0].draw(p) // hover circle indicator
        p.strokeWeight(0)
    }

    public override isClicked(cx: number, cy: number): boolean {
        // FIXME: Implement point-line collision
        return false
    }
}