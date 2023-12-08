
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

    public abstract draw(p: p5): void
    public abstract isClicked(cx: number, cy: number): boolean

    public setParams(newParams: Object): void {
        this.drawParams = { ...this.drawParams, ...newParams }
        console.log(this.drawParams)
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

/*
class SwitchView implements ColigView {
    x: number 
    y: number
    drawParams: { lightOn: boolean }

    constructor() {
        super()
        this.drawParams = { lightOn: false }
        this.views = []
    }

    isClicked(x: number, y: number): boolean {
        throw new Error("Method not implemented.")
    }

    draw(p: p5): void {
        throw new Error("Method not implemented.")
    }

    move(x: number, y: number): void {
        throw new Error("Method not implemented.")
    }

    setParams(newParams: Object): void {
        this.drawParams = newParams
    }
}
*/


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