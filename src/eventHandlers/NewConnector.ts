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

    onMousePress(p: p5): boolean {
        let subWidget: ColigWidget
        for (let widget of this.widgets) {
            let res = widget.getWidget(p.mouseX, p.mouseY)
            if (res != undefined ) subWidget = res
        }

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

    onMouseDrag(p: p5): boolean {
        if (this.newConnector != undefined) {
            this.newConnector.setState({ x2: p.mouseX, y2: p.mouseY })
            return true
        }
        return false
    }

    onMouseRelease(p: p5): boolean {
        this.newConnector = undefined
        return false
    }
}