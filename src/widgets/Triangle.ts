import { ColigWidget } from "./ColigWidget"

export type TriangleParams = {
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    color: string // Hex color code
}

export class Triangle extends ColigWidget {
    state: TriangleParams

    constructor(state: TriangleParams) {
        super()
        this.state = state
    }

    public override draw(p: p5): void {
        const { x1, y1, x2, y2, x3, y3, color } = this.state
        p.fill(p.color(color))
        p.triangle(x1, y1, x2, y2, x3, y3)
    }

    public override isClicked(cx: number, cy: number): boolean {
        // FIXME: Implement correct point-triangle detection.
        return false
    }
}