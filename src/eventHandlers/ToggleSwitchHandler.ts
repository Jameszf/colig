import { InputSwitch, InputSwitchElement } from "../elements/InputSwitch";
import { ColigWidget } from "../widgets/ColigWidget";
import { EventHandler } from "./EventHandler";


export class ToggleSwitchHandler extends EventHandler {
    constructor(widgets: ColigWidget[]) {
        super()
        this.widgets = widgets
    }

    public onMousePress(p: p5): boolean {
        const clickedWidget = this.getClickedWidget(p)
        if (clickedWidget && 
            clickedWidget instanceof InputSwitchElement && 
            clickedWidget.isToggled(p.mouseX, p.mouseY)) {
            const logic = clickedWidget.getLogic() as InputSwitch
            logic.setState(!logic.getState())
            return true
        }
        return false
    }

    public onMouseDrag(p: p5): boolean {
        return false
    }

    public onMouseRelease(p: p5): boolean {
        return false
    }

    public onMouseMove(p: p5): boolean {
        return false
    }
}