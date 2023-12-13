import { ColigWidget } from "../widgets/ColigWidget";
import { ConnectorPort } from "../widgets/ConnectorPort";
import { LogicalConnector } from "../widgets/LogicalConnector";
import { EventHandler } from "./EventHandler";


export class NewConnector extends EventHandler {
    newConnector: ColigWidget

    constructor(widgets: ColigWidget[]) {
        super()
        this.widgets = widgets
    }

    private getSubWidget(mx: number, my: number) {
        let subWidget: ColigWidget
        for (let widget of this.widgets) {
            let res = widget.getWidget(mx, my)
            if (res != undefined ) subWidget = res
        }
        return subWidget
    }

    public override onMousePress(p: p5): boolean {
        const subWidget = this.getSubWidget(p.mouseX, p.mouseY)
        if (subWidget instanceof ConnectorPort) {
            // Create new LogicalConnector.
            console.log("Create connector!")
            const newConnector = new LogicalConnector({ x: subWidget.getX(), y: subWidget.getY(), x2: p.mouseX, y2: p.mouseY, color: "#111111", weight: 12})
            this.widgets.push(newConnector)
            this.newConnector = newConnector
            return true
        }
        return false
    }

    public override onMouseDrag(p: p5): boolean {
        if (this.newConnector != undefined) {
            this.newConnector.setState({ x2: p.mouseX, y2: p.mouseY })
            return true
        }
        return false
    }

    public override onMouseRelease(p: p5): boolean {
        const subWidget = this.getSubWidget(p.mouseX, p.mouseY)
        if (subWidget instanceof ConnectorPort) {
            console.log("Connecting Connector!")
            this.newConnector.setState({ x2: subWidget.getX(), y2: subWidget.getY() })
        }

        this.newConnector = undefined
        return true
    }
}