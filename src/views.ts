
import * as p5 from 'p5'
import * as params from "./drawParamsTypes"


interface Drawable {
    draw(p: p5): void
}

interface Clickable {
    isClicked(x: number, y: number): boolean
}


abstract class ColigView implements Drawable, Clickable {
    drawParams: Object
    subViews: ColigView[]

    public draw(p: p5): void {
        this.subViews.forEach(subView => subView.draw(p))
    }

    public isClicked(cx: number, cy: number): boolean {
        let clicked: boolean = false
        for (let view of this.subViews) {
            clicked ||= view.isClicked(cx, cy)
        }
        return clicked

    }

    public setParams(newParams: Object): void {
        this.drawParams = { ...this.drawParams, ...newParams }
    }
}


class Rectangle extends ColigView {
    drawParams: params.RectangleParams

    constructor(drawParams: params.RectangleParams) {
        super()
        this.drawParams = drawParams
    }

    public override draw(p: p5): void {
        const { x, y, height, width, color } = this.drawParams
        p.fill(p.color(color))
        p.rect(x, y, height, width)
    }

    public override isClicked(cx: number, cy: number): boolean {
        const { x, y, height, width } = this.drawParams
        return cx > x && cx < x + width && cy > y && cy < y + height
    }
}


class Circle extends ColigView{
    drawParams: params.CircleParams

    constructor(drawParams: params.CircleParams) {
        super()
        this.drawParams = drawParams
    }

    public override draw(p: p5): void {
        const { x, y, radius, color } = this.drawParams
        p.fill(p.color(color))
        p.circle(x, y, radius * 2)
    }

    public override isClicked(cx: number, cy: number): boolean {
        const { x, y, radius } = this.drawParams
        let dx = x - cx
        let dy = y - cy
        return dx * dx + dy * dy < radius * radius
    }
}


class Triangle extends ColigView {
    drawParams: params.TriangleParams

    constructor(drawParams: params.TriangleParams) {
        super()
        this.drawParams = drawParams
    }

    public override draw(p: p5): void {
        const { x1, y1, x2, y2, x3, y3, color } = this.drawParams
        p.fill(p.color(color))
        p.triangle(x1, y1, x2, y2, x3, y3)
    }

    public override isClicked(cx: number, cy: number): boolean {
        // FIXME: Implement correct point-triangle detection.
        return false
    }
}


export class InputSwitchView extends ColigView {
    drawParams: params.InputSwitchViewParams

    constructor(drawParams: params.InputSwitchViewParams) {
        super()
        const { x, y, lightOn } = drawParams
        const [ recLength, btnRadius ]  = [ 60, 26 ]
        const padding = (recLength - btnRadius * 2) / 2

        this.drawParams = drawParams
        this.subViews = [
            new Rectangle({x, y, width: recLength, height: recLength, color: "#212121"}),
            new Triangle({ x1: x + recLength, y1: y, x2: x + recLength, y2: y + recLength, x3: Math.round(x + recLength * 3 / 2), y3: Math.round(y + recLength / 2), color: "#929392" }),
            new Circle({x: x + 90, y: y + 30, radius: 10, color: "#ffffff"}),
            new ToggleButtonView({ x: x + padding, y: y + padding, radius: btnRadius, lightOn })
        ]
    }


    public override isClicked(cx: number, cy: number): boolean {
        return this.subViews[3].isClicked(cx, cy)
    }


    public override setParams(newParams: params.InputSwitchViewParams): void {
        this.drawParams = { ...this.drawParams, ...newParams }
        if (newParams["lightOn"] != undefined) {
            this.subViews[3].setParams({ lightOn: newParams.lightOn })
        }
    }
}


class ToggleButtonView extends ColigView {
    drawParams: params.ToggleButtonViewParams

    constructor(drawParams: params.ToggleButtonViewParams) {
        super()
        this.drawParams = drawParams
        this.subViews = [new Circle({
            x: drawParams.x + drawParams.radius, 
            y: drawParams.y + drawParams.radius, 
            radius: drawParams.radius, 
            color: "#ffffff"
        })]
    }

    public override isClicked(cx: number, cy: number): boolean {
        let clicked: boolean = false
        for (let view of this.subViews) {
            clicked ||= view.isClicked(cx, cy)
        }
        return clicked
    }

    public override draw(p: p5): void {
        if (this.drawParams.lightOn) {
           this.subViews[0].setParams({color: "#53b252"})
        } else {
           this.subViews[0].setParams({color: "#b74035"})
        }
        this.subViews[0].draw(p)
    }
}

export { Circle, Rectangle, ToggleButtonView, ColigView }