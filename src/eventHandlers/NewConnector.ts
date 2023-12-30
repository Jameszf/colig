import { LogicalConnector } from "../elements/LogicalConnector";
import { ColigWidget } from "../widgets/ColigWidget";
import { EventHandler } from "./EventHandler";


export class NewConnector extends EventHandler {
    newConnector: LogicalConnector
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
    
    private createNewConnector(): void {
        // TODO: Implemenet
    }

    public override onMousePress(p: p5): boolean {
        return false
    }

    public override onMouseDrag(p: p5): boolean {
        this.portClicked = false;
        return false
    }

    public override onMouseMove(p: p5): boolean {
        return false
    }

    // FIXME: No connection is established if mouse is over another connector and 
    // user drags the widget.
    public override onMouseRelease(p: p5): boolean {
        return false
    }
}