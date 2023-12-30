import { Circle } from "./Circle";
import { LogicalConnector, LogicalConnectorElement } from "../elements/LogicalConnector";

export class WidgetFactory {

    public static LogicalConnector(): LogicalConnectorElement
    public static LogicalConnector(weight: number): LogicalConnectorElement
    public static LogicalConnector(weight?: number, points?: [number, number][]): LogicalConnectorElement {
        if (weight == undefined) weight = 12
        if (points == undefined) points = []
        return new LogicalConnectorElement({ x: 0, y: 0, weight, points })
    }

    public static ConnectorPort(x: number, y: number): Circle
    public static ConnectorPort(x: number, y: number, radius: number): Circle 
    public static ConnectorPort(
        x: number, 
        y: number, 
        radius?: number, 
    ): Circle {
        if (radius == undefined) radius = 10
        return new Circle({ x, y, radius, color: "#707070" })
    }

    public static Circle(x: number, y: number, radius: number, color: string): Circle {
        return new Circle({ x, y, radius, color })
    }
}