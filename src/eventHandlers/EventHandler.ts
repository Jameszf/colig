import { ColigWidget } from "../widgets/ColigWidget";


export abstract class EventHandler {
    widgets: ColigWidget[]

    public abstract onMousePress(p: p5): boolean
    public abstract onMouseDrag(p: p5): boolean
    public abstract onMouseRelease(p: p5): boolean
    public abstract onMouseMove(p: p5): boolean
}