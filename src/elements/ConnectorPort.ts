import { Circle } from "../widgets/Circle";
import { ColigWidget } from "../widgets/ColigWidget";
import { LogicalConnector } from "./LogicalConnector";
import { WidgetFactory } from "../widgets/WidgetFactory";
import { ColigElement } from "./ColigElement";


export type ConnectorPortState = {
    x: number,
    y: number,
    radius: number,
    logicalState: boolean,
    connectors: LogicalConnector[]
}

export class ConnectorPort extends ColigElement {
    state: ConnectorPortState

    constructor(state: ConnectorPortState) {
        super()
        this.state = state
        this.subWidgets = [WidgetFactory.Circle(this.state.x, this.state.y, this.state.radius, "#3f5dbf")]
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

    public getLogicalState(): boolean {
        return this.state.logicalState
    }

    public getConnectors(): LogicalConnector[] {
        return this.state.connectors
    }

    public addConnector(newConnector: LogicalConnector): void {
        this.state.connectors.push(newConnector)
    }
}
