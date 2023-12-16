import { ColigWidget } from "../widgets/ColigWidget";
import { ConnectorPort } from "../widgets/ConnectorPort";
import { LogicalConnector } from "../widgets/LogicalConnector";
import { EventHandler } from "./EventHandler";


export class NewConnector extends EventHandler {
    newConnector: LogicalConnector
    pseudoPort: ConnectorPort
    portClicked: boolean

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
        if (subWidget != undefined && subWidget instanceof ConnectorPort) {
            this.portClicked = true;
        }
        return false
    }

    public override onMouseDrag(p: p5): boolean {
        this.portClicked = false;
        return false
    }

    public override onMouseMove(p: p5): boolean {
        if (this.pseudoPort != undefined) {
            console.log("Dragging...")
            this.pseudoPort.setState({ x: p.mouseX, y: p.mouseY })
            return true
        }
        return false
    }

    public override onMouseRelease(p: p5): boolean {
        // FIXME: LogicalConnections should not connect to their starting ConnectorPort.
        const subWidget = this.getSubWidget(p.mouseX, p.mouseY)
        if (subWidget == undefined && this.pseudoPort != undefined) {
            this.pseudoPort.setState({ radius: 10 })
            this.widgets.push(this.pseudoPort)
            this.newConnector = undefined
            this.pseudoPort = undefined
            return true
        }

        if (subWidget instanceof ConnectorPort) {
            if (this.pseudoPort == undefined && this.portClicked) {
                this.pseudoPort = new ConnectorPort({ x: p.mouseX, y: p.mouseY, radius: 0 })
                this.newConnector = new LogicalConnector({ 
                    x: 0, 
                    y: 0, 
                    color: "#111111", 
                    weight: 12, 
                    startPort: subWidget, 
                    endPort: this.pseudoPort
                })
                this.widgets.push(this.newConnector)
                this.portClicked = false
            } else if (this.pseudoPort != undefined) {
                this.newConnector.setState({ endPort: subWidget })
                this.pseudoPort = undefined
                this.newConnector = undefined
            }
            return true
        }
        return false
    }
}