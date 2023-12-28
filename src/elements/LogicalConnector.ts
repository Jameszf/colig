import { Circle } from "../widgets/Circle";
import { ColigWidget } from "../widgets/ColigWidget";
import { ColigElement } from "./ColigElement";
import { ConnectorPort } from "./ConnectorPort";


export type LogicalConnectorState = {
    x: number,
    y: number,
    weight: number,
    points: [number, number][],
    isOn: boolean
}

export class LogicalConnector extends ColigElement {
    state: LogicalConnectorState

    constructor(state: LogicalConnectorState) {
        super()
        this.state = state
        this.subWidgets = []
    }

    public override draw(p: p5): void {
        const { weight, points, isOn } = this.state
        if (isOn) {
            p.stroke("#ea402a")
        } else {
            p.stroke("#3f3b3b")
        }
        p.strokeWeight(weight)

        for (let i = 0; i < points.length - 1; i++) {
            p.line(points[i][0], points[i][1], points[i + 1][0], points[i + 1][1])
        }
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