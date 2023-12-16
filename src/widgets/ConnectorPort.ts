import { Circle } from "./Circle";
import { ColigWidget } from "./ColigWidget";


export type ConnectorPortState = {
    x: number,
    y: number,
    radius: number
}

export class ConnectorPort extends ColigWidget {
    state: ConnectorPortState

    constructor(state: ConnectorPortState) {
        super()
        this.state = state
        this.subWidgets = [new Circle({ x: this.state.x, y: this.state.y, radius: this.state.radius, color: "#3f5dbf" })]
    }

    public override getWidget(mx: number, my: number): ColigWidget {
        if (this.isClicked(mx, my)) {
            return this
        }
    }

    public override setState(newParams: Object): void {
        this.subWidgets[0].setState(newParams)
        this.state = { ...this.state, ...newParams }
    }
}
