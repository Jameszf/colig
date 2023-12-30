import { ColigWidget } from "../widgets/ColigWidget";
import { ColigLogic } from "./ColigLogic";


export abstract class ColigElement extends ColigWidget {
    logic: ColigLogic

    public getLogic(): ColigLogic {
        return this.logic
    }

    public abstract isPort(x: number, y :number): boolean
}
