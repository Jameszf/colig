
import * as p5 from 'p5'


interface Drawable {
    draw(p: p5): void
}


class Rectangle implements Drawable {
    x: number
    y: number
    width: number
    height: number
    color: p5.Color

    constructor(x: number, y: number, width: number, height: number, color: p5.Color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
    }

    draw(p: p5): void {
        p.fill(this.color)
        p.rect(this.x, this.y, this.width, this.height)
    }
}


class Circle implements Drawable {
    x: number
    y: number
    radius: number
    color: p5.Color

    constructor(x: number, y: number, radius: number, color: p5.Color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }

    draw(p: p5): void {
        p.fill(this.color)
        p.circle(this.x, this.y, this.radius * 2)
    }
}


class Line implements Drawable {
    x1: number
    y1: number
    x2: number
    y2: number
    color: p5.Color
    weight: number

    constructor(x1: number, y1: number, x2: number, y2: number, color: p5.Color, weight: number = 5) {
        this.x1 = x1
        this.y1 = y1
        this.x2 = x2
        this.y2 = y2
        this.color = color
        this.weight = weight
    }

    draw(p: p5): void {
        p.stroke(this.color)
        p.strokeWeight(this.weight)
        p.line(this.x1, this.y1, this.x2, this.y2)
    }
}


class LogicUnit implements Drawable {
    draw(p: p5): void {

    }
}

export { Circle, Rectangle, Line, LogicUnit, Drawable }