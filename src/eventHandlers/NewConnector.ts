import { ConnectorPort } from "../elements/ConnectorPort";
import { LogicalConnector } from "../elements/LogicalConnector";
import { ColigWidget } from "../widgets/ColigWidget";
import { WidgetFactory } from "../widgets/WidgetFactory";
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
    
    private createNewConnector(startPort: ConnectorPort): void {
        // TODO: Implemenet
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

    // FIXME: No connection is established if mouse is over another connector and 
    // user drags the widget.
    public override onMouseRelease(p: p5): boolean {
        const subWidget = this.getSubWidget(p.mouseX, p.mouseY)
        if (subWidget == undefined && this.pseudoPort != undefined) {
            const oldPort = this.pseudoPort
            oldPort.setState({ radius: 10 })
            this.widgets.push(oldPort)
            this.createNewConnector(this.pseudoPort)
            this.pseudoPort.setState({ x: p.mouseX, y: p.mouseY })
            return true
        }

        if (subWidget instanceof ConnectorPort) {
            if (this.pseudoPort == undefined && this.portClicked) {
                this.createNewConnector(subWidget)
                this.pseudoPort.setState({ x: p.mouseX, y: p.mouseY })
                this.portClicked = false
            } else if (this.pseudoPort != undefined) {
                this.newConnector.setState({ port2: subWidget })
                this.pseudoPort = undefined
                this.newConnector = undefined
            }
            return true
        }
        return false
    }
}