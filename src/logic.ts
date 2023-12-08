
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

export { ColigLogic }