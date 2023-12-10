import { ColigWidget } from "./ColigWidget";


export type TextWidgetState = {
    x: number,
    y: number,
    str: string,
    width?: number,
    height?: number,
    fontSize: number
}

export class TextWidget extends ColigWidget {
    state: TextWidgetState 

    constructor(state: TextWidgetState) {
        super()
        this.state = state
        this.subWidgets = []
    }

    public override draw(p: p5): void {
        p.textSize(this.state.fontSize)
        if (!this.state.width || this.state.height) {
            p.text(this.state.str, this.state.x, this.state.y)
        } else {
            p.text(this.state.str, this.state.x, this.state.y, this.state.width, this.state.height)
        }
    }

    public override isClicked(cx: number, cy: number): boolean {
        return false
    }
}