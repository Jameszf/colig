import { Circle } from "./Circle"
import { ColigWidget } from "./ColigWidget"


export type ToggleButtonParams = {
    x: number,
    y: number,
    radius: number,
    lightOn: boolean,
    callback?: Function
}

export class ToggleButtonWidget extends ColigWidget {
    state: ToggleButtonParams

    constructor(state: ToggleButtonParams) {
        super()
        this.state = state
        this.subWidgets = [new Circle({
            x: state.x + state.radius, 
            y: state.y + state.radius, 
            radius: state.radius, 
            color: "#ffffff"
        })]
    }

    public override draw(p: p5): void {
        if (this.state.lightOn) {
           this.subWidgets[0].setState({color: "#53b252"})
        } else {
           this.subWidgets[0].setState({color: "#b74035"})
        }
        this.subWidgets[0].draw(p)
    }

    public override getWidget(mx: number, my: number): ColigWidget {
        if (this.isClicked(mx, my)) {
            return this
        }
    }

    public override onMouseClick(p: p5): void {
        this.setState({ lightOn: !this.state.lightOn })
        if (this.state.callback != undefined) {
            this.state.callback()
        }
    }
}