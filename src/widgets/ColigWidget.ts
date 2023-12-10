
type State = { x: number, y: number } & Record<string, any> 

export abstract class ColigWidget {
    state: State
    subWidgets: ColigWidget[]

    // FIXME: Remove this.subWidgets = [] from primitive widgets.
    public draw(p: p5): void {
        this.subWidgets.forEach(subWidget => subWidget.draw(p))
    }

    public isClicked(cx: number, cy: number): boolean {
        let clicked: boolean = false
        for (let Widget of this.subWidgets) {
            clicked ||= Widget.isClicked(cx, cy)
        }
        return clicked
    }

    public move(newX: number, newY: number): void {
        for (let subWidget of this.subWidgets) {
            const dx = subWidget.getX() - this.state.x
            const dy = subWidget.getY() - this.state.y
            subWidget.move(newX + dx, newY + dy)
        }
        this.setState({x: newX, y: newY})
    }

    public setState(newParams: Object): void {
        this.state = { ...this.state, ...newParams }
    }

    public getX(): number {
        return this.state.x
    }

    public getY(): number {
        return this.state.y
    }

    public handleMouseClickEvent(p: p5) {
        if (this.isClicked(p.mouseX, p.mouseY)) {
            this.onMouseClick(p)
        }
    }

    protected onMouseClick(p: p5) {
        for (let i = this.subWidgets.length - 1; i >= 0; i--) {
            if (this.subWidgets[i].isClicked(p.mouseX, p.mouseY)) {
                this.subWidgets[i].handleMouseClickEvent(p)
                break
            }
        }
    }
}