import { EventHandler } from "./EventHandler";
import { ColigWidget } from "../widgets/ColigWidget";


export class DragAndDrop extends EventHandler {
    selected: ColigWidget
    selectedDx: number
    selectedDy: number
    
    constructor(widgets: ColigWidget[]) {
        super()
        this.widgets = widgets
        this.selectedDx = 0
        this.selectedDy = 0
    }

    onMousePress(p: p5): boolean {
        for (let widget of this.widgets) {
            if (widget.isClicked(p.mouseX, p.mouseY)) {
                this.selected = widget 
                this.selectedDx = p.mouseX - widget.getX()
                this.selectedDy = p.mouseY - widget.getY()
                return true
            }
        }
        return false
    }

    onMouseDrag(p: p5): boolean {
        if (this.selected != undefined) { // Dragging a widget (not connector).
            this.selected.move(p.mouseX - this.selectedDx, p.mouseY - this.selectedDy)
            return true
        }
        return false
    }

    onMouseRelease(p: p5): boolean {
        this.selected = undefined
        this.selectedDx = 0
        this.selectedDy = 0
        return true
    }
} 