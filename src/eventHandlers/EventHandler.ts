import { ColigWidget } from "../widgets/ColigWidget";


export abstract class EventHandler {
    widgets: ColigWidget[]

    abstract onMousePress(p: p5): boolean
    abstract onMouseDrag(p: p5): boolean
    abstract onMouseRelease(p: p5): boolean
}