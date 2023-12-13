import { Circle } from "./Circle";
import { ColigWidget } from "./ColigWidget";


export type ConnectorPortState = {
    x: number,
    y: number,
}

export class ConnectorPort extends ColigWidget {
    static radius: number = 10
    state: ConnectorPortState

    constructor(state: ConnectorPortState) {
        super()
        this.state = state
        this.subWidgets = [new Circle({ x: this.state.x, y: this.state.y, radius: ConnectorPort.radius, color: "#3f5dbf" })]
    }

    public override getWidget(mx: number, my: number): ColigWidget {
        if (this.isClicked(mx, my)) {
            return this
        }
    }
}
