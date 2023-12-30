import { Circle } from "../widgets/Circle";
import { ColigElement } from "./ColigElement";
import { ColigLogic } from "./ColigLogic";


type Point = [number, number]

export type LogicalConnectorState = {
    x: number,
    y: number,
    weight: number,
    points: (Point | Circle)[],
}

export class LogicalConnector extends ColigLogic {
    logicalState: boolean

    constructor() {
        super(0, 0, [], [])
    }

    public getState(): boolean {
        return this.logicalState
    }
}

export class LogicalConnectorElement extends ColigElement {
    state: LogicalConnectorState
    logic: LogicalConnector

    constructor(state: LogicalConnectorState) {
        super()
        this.state = state
        this.subWidgets = []
        this.logic = new LogicalConnector()
    }

    private getPointData(obj: Point | Circle): [number, number] {
        if (obj instanceof Circle) {
            return [ obj.getX(), obj.getY() ]
        } else {
            return obj
        }
    }

    public override draw(p: p5): void {
        const { weight, points } = this.state
        if (this.logic.getState()) {
            p.stroke("#ea402a")
        } else {
            p.stroke("#3f3b3b")
        }
        p.strokeWeight(weight)

        for (let i = 1; i < points.length - 1; i++) {
            const p1 = this.getPointData(points[i - 1])
            const p2 = this.getPointData(points[i])
            p.line(p1[0], p1[1], p2[0], p2[1])
        }
        p.strokeWeight(0)
    }

    public override isClicked(cx: number, cy: number): boolean {
        // FIXME: Implement point-line collision
        return false
    }

    public isPort(x: number, y: number): boolean {
        return false
    }

    public override getX() {
        return 0
    }

    public override getY() {
        return 0
    }
}