import { Circle } from "./Circle";
import { ColigWidget } from "./ColigWidget";
import { ConnectorPort } from "./ConnectorPort";


export type LogicalConnectorState = {
    x: number,
    y: number,
    color: string,
    weight: number,
    startPort: ConnectorPort
    endPort: ConnectorPort
}

export class LogicalConnector extends ColigWidget {
    state: LogicalConnectorState

    constructor(state: LogicalConnectorState) {
        super()
        this.state = state
        this.subWidgets = []
    }

    public override draw(p: p5): void {
        const { startPort, endPort, color, weight } = this.state
        p.stroke(color)
        p.strokeWeight(weight)
        p.line(startPort.getX(), startPort.getY(), endPort.getX(), endPort.getY())
        p.strokeWeight(0)
    }

    public override isClicked(cx: number, cy: number): boolean {
        // FIXME: Implement point-line collision
        return false
    }

    public override getX() {
        return 0
    }

    public override getY() {
        return 0
    }
}