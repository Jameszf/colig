import { ColigWidget } from "./ColigWidget"

export type TriangleParams = {
    x: number,
    y: number,
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
        this.subWidgets = []
    }

    public move(newX: number, newY: number): void {
        const { x, y, x2, y2, x3, y3 } = this.state
        const [ dx2, dy2, dx3, dy3 ] = [ x2 - x, y2 - y, x3 - x, y3 - y ]
        this.setState({x: newX, y: newY, x2: newX + dx2, y2: newY + dy2, x3: newX + dx3, y3: newY + dy3 })
    }

    public override draw(p: p5): void {
        const { x, y, x2, y2, x3, y3, color } = this.state
        p.fill(p.color(color))
        p.triangle(x, y, x2, y2, x3, y3)
    }

    public override isClicked(cx: number, cy: number): boolean {
        const { x, y, x2, y2, x3, y3 } = this.state

        // This method of collision detection is taken from 
        // http://jeffreythompson.org/collision-detection/tri-point.php 
        const areaOrig: number = Math.abs( (x2-x)*(y3-y) - (x3-x)*(y2-y) );
        const area1 = Math.abs((x-cx)*(y2-cy) - (x2-cx)*(y-cy) );
        const area2 = Math.abs((x2-cx)*(y3-cy) - (x3-cx)*(y2-cy) );
        const area3 = Math.abs((x3-cx)*(y-cy) - (x-cx)*(y3-cy) );

        return area1 + area2 + area3 == areaOrig
    }
}