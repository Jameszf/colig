import { ColigWidget } from "./ColigWidget"
import { Rectangle } from "./Rectangle"
import { Circle } from "./Circle"
import { Triangle } from "./Triangle"
import { ConnectorPort } from "./ConnectorPort"


export type OutputLightState = {
    x: number,
    y: number,
    lightOn: boolean
}

export class OutputLight extends ColigWidget {
    static recLength = 60
    static btnRadius = 26
    state: OutputLightState

    constructor(state: OutputLightState) {
        super()
        this.state = state
        const { x, y } = this.state
        const [ recLength, btnRadius ] = [ OutputLight.recLength, OutputLight.btnRadius ]
        const padding = (recLength - btnRadius * 2) / 2
        this.subWidgets = [
            new Rectangle({ x, y, width: recLength, height: recLength, color: "#111111" }),
            new Circle({ x: x + btnRadius + padding, y: y + btnRadius + padding, radius: btnRadius, color: "#929392" }),
            new Triangle({ x, y, x2: x, y2: y + recLength, x3: x - recLength / 2, y3: y + recLength / 2, color: "#111111" }),
            new ConnectorPort({ x: x - recLength / 2, y: y + recLength / 2, radius: 10 })
        ]
        this.updateLight()
    }

    private updateLight(): void {
        if (this.state.lightOn) {
           this.subWidgets[1].setState({color: "#53b252"})
        } else {
           this.subWidgets[1].setState({color: "#b74035"})
        }
    }

    public override setState(newParams: OutputLightState): void {
        this.state = { ...this.state, ...newParams }
        this.updateLight()
    }
}