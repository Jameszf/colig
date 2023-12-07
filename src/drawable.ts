
import * as p5 from 'p5'


interface Drawable {
    draw(p: p5): void
}

interface Locateable {
    pointCollision(x: number, y: number): boolean
}

interface Shape extends Drawable, Locateable {
    x: number
    y: number
    move(newX: number, newY: number): void
}

class Rectangle implements Shape {
    x: number
    y: number
    width: number
    height: number
    color: string // Hex color code

    constructor(x: number, y: number, width: number, height: number, color: string) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
    }

    move(newX: number, newY: number): void {
        this.x = newX
        this.y = newY
    }

    draw(p: p5): void {
        p.fill(p.color(this.color))
        p.rect(this.x, this.y, this.width, this.height)
    }

    pointCollision(x: number, y: number): boolean {
        return x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height
    }
}


class Circle implements Shape {
    x: number
    y: number
    radius: number
    color: string

    constructor(x: number, y: number, radius: number, color: string) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }

    move(newX: number, newY: number): void {
        this.x = newX
        this.y = newY
    }

    draw(p: p5): void {
        p.fill(p.color(this.color))
        p.circle(this.x, this.y, this.radius * 2)
    }

    pointCollision(x: number, y: number): boolean {
        let dx = this.x - x
        let dy = this.y - y
        return dx * dx + dy * dy < this.radius * this.radius
    }
}


class Line implements Drawable, Locateable {
    x1: number
    y1: number
    x2: number
    y2: number
    color: string
    weight: number

    constructor(x1: number, y1: number, x2: number, y2: number, color: string, weight: number = 5) {
        this.x1 = x1
        this.y1 = y1
        this.x2 = x2
        this.y2 = y2
        this.color = color
        this.weight = weight
    }

    draw(p: p5): void {
        p.stroke(p.color(this.color))
        p.strokeWeight(this.weight)
        p.line(this.x1, this.y1, this.x2, this.y2)
    }

    pointCollision(x: number, y: number): boolean {
        // TODO: implement
        return false;
    }
}


abstract class Widget implements Drawable, Locateable {
    shapes: Shape[]

    constructor(shapes: Shape[]) {
        this.shapes = shapes
    }

    draw(p: p5): void {
        for (let shape of this.shapes) {
            shape.draw(p)
        }
    }

    pointCollision(x: number, y: number): boolean {
        let collision: boolean = false
        for (let shape of this.shapes) {
            collision ||= shape.pointCollision(x, y)
        }
        return collision
    }

    // Event handling
    onMouseDown(p: p5): void {}
    onMouseUp(p: p5): void {}
    onMousePress(p: p5): void {}
}


class ColigSwitchView extends Widget {


    constructor(button: Shape) {
        super([button])
    }

    onMouseDown(p: p5) {

    }
}


class Testing implements Drawable {
    draw(p: p5): void {
    }

}


export { Circle, Rectangle, Line, Drawable, Shape }