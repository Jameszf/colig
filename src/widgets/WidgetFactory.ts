import { Circle } from "./Circle";
import { ConnectorPort } from "../elements/ConnectorPort";
import { LogicalConnector } from "../elements/LogicalConnector";

export class WidgetFactory {

    public static LogicalConnector(): LogicalConnector
    public static LogicalConnector(weight: number): LogicalConnector
    public static LogicalConnector(weight?: number, points?: [number, number][]): LogicalConnector {
        if (weight == undefined) weight = 12
        if (points == undefined) points = []
        return new LogicalConnector({ x: 0, y: 0, weight, points, isOn: false })
    }

    public static ConnectorPort(x: number, y: number): ConnectorPort
    public static ConnectorPort(x: number, y: number, radius: number): ConnectorPort
    public static ConnectorPort(
        x: number, 
        y: number, 
        radius?: number, 
        logicalState?: boolean, 
        connectors?: LogicalConnector[]
    ): ConnectorPort {
        if (radius == undefined) radius = 10
        if (logicalState == undefined) logicalState = false
        if (connectors == undefined) connectors = []
        return new ConnectorPort({ x, y, radius, logicalState, connectors })
    }

    public static Circle(x: number, y: number, radius: number, color: string): Circle {
        return new Circle({ x, y, radius, color })
    }
}