import { ColigWidget } from "./ColigWidget"

export type RectangleParams = {
    x: number
    y: number
    width: number
    height: number
    color: string // Hex color code
}

export class Rectangle extends ColigWidget {
    state: RectangleParams

    constructor(state: RectangleParams) {
        super()
        this.state = state
        this.subWidgets = []
    }

    public override draw(p: p5): void {
        const { x, y, height, width, color } = this.state
        p.fill(p.color(color))
        p.rect(x, y, height, width)
    }

    public override isClicked(cx: number, cy: number): boolean {
        const { x, y, height, width } = this.state
        return cx > x && cx < x + width && cy > y && cy < y + height
    }
}