

export type RectangleParams = {
    x: number
    y: number
    width: number
    height: number
    color: string // Hex color code
}

export type CircleParams = {
    x: number
    y: number
    radius: number
    color: string // Hex color code
}

export type TriangleParams = {
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    color: string
}

export type ToggleButtonViewParams = {
    x: number,
    y: number,
    radius: number,
    lightOn: boolean
}

export type InputSwitchViewParams = {
    x: number,
    y: number,
    lightOn: boolean
}
