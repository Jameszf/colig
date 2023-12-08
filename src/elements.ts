
import * as p5 from "p5"
import { Shape, Circle } from "./drawable"


interface ColigView {
    drawParams: Object
    shapes: (Shape | ColigView)[]
    x: number
    y: number
    draw(p: p5): void
    move(x: number, y: number): void
    setParams(newParams: Object): void
}

/*
 * Connection[0] - Next ColigLogic.
 * Connection[1] - Output line number of the current ColigLogic.
 * Connection[2] - Input line number of the next ColigLogic.
 */
type LogicalConnection = [ColigLogic, number, number]

class ColigLogic {
    outputLines: number
    outputConnections: LogicalConnection[]
    inputs: boolean[]
    cachedOutputs: boolean[]
    internalLogic: ColigLogic[]


    constructor(numOfInputs: number, 
        outputLines: number,
        internalLogic: ColigLogic[], 
        outputConnections: LogicalConnection[]
    ) {
        this.outputConnections = outputConnections
        this.internalLogic = internalLogic
        this.inputs = Array(numOfInputs).fill(false)
        this.outputLines = outputLines
        this.cachedOutputs = this.compute()
    }

    protected compute(): boolean[] {
        throw new Error("Not implemeneted!")
    }

    public propogate(): void {
        const outputs: boolean[] = this.compute()
        for (let [nextLogic, outputNumber, inputNumber] of this.outputConnections) {
            nextLogic.setInput(inputNumber, outputs[outputNumber])
        }
    }

    public setInput(inputNumber: number, value: boolean): void {
        this.inputs[inputNumber] = value
    }

    public getCachedOutputs(): boolean[] {
        return this.cachedOutputs
    }
}


class ANDGate extends ColigLogic {
    constructor() {
        super(2, 1, [], [])
    }

    protected override compute(): boolean[] {
        return [this.inputs[0] && this.inputs[1]]
    }
}


class NOTGate extends ColigLogic {
    constructor() {
        super(1, 1, [], [])
    }

    protected override compute(): boolean[] {
        return [!this.inputs[0]]
    }
}


class ToggleSwitch extends ColigLogic {
    switchState: boolean

    constructor() {
        super(0, 1, [], [])
        this.switchState = false
    }

    protected override compute(): boolean[] {
        return [this.switchState]
    }

    public setState(newState: boolean) {
        this.switchState = newState
    }
}


class OutputLight extends ColigLogic {
    constructor() {
        super(1, 1, [], [])
    }

    protected override compute(): boolean[] {
        return [this.inputs[0]]
    }
}


abstract class ColigElement {
    name: string
    view: ColigView
    logic: ColigLogic    
}


class SwitchView implements ColigView {
    x: number 
    y: number
    drawParams: Object
    shapes: (Shape | ColigView)[]

    constructor() {
        this.drawParams = { lightOn: false }
        this.shapes = []
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


class ToggleButtonView implements ColigView {
    drawParams: { lightOn: boolean }
    shapes: Circle[]
    radius: number
    x: number 
    y: number

    constructor(radius: number, x: number, y: number) {
        this.drawParams = { lightOn: false }
        this.radius = radius
        this.x = x
        this.y = y
        this.shapes = [new Circle(x + radius, y + radius, radius, "#ffffff")]
    }

    draw(p: p5): void {
        if (this.drawParams.lightOn) {
           this.shapes[0].setColor("#53b252")
        } else {
           this.shapes[0].setColor("#b74035")
        }
        this.shapes[0].draw(p)
    }

    move(x: number, y: number): void {
        this.shapes[0].move(x, y)
    }

    setParams(newParams: { lightOn: boolean }): void {
        this.drawParams = newParams
    }

}


export { ToggleButtonView }