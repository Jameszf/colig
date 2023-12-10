import { ColigWidget } from "./ColigWidget"

export type CircleParams = {
    x: number
    y: number
    radius: number
    color: string // Hex color code
}

export class Circle extends ColigWidget{
    state: CircleParams

    constructor(state: CircleParams) {
        super()
        this.state = state
        this.subWidgets = []
    }

    public override draw(p: p5): void {
        const { x, y, radius, color } = this.state
        p.fill(p.color(color))
        p.circle(x, y, radius * 2)
    }

    public override isClicked(cx: number, cy: number): boolean {
        const { x, y, radius } = this.state
        let dx = x - cx
        let dy = y - cy
        return dx * dx + dy * dy < radius * radius
    }
}
