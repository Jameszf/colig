import { ColigWidget } from "../widgets/ColigWidget";
import { ColigLogic } from "./ColigLogic";


export class ColigElement extends ColigWidget {
    logic: ColigLogic
    getLogic(): ColigLogic {
        return this.logic
    }
}
