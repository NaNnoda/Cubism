import {LinearLayout} from "./LinearLayout";
import {Point2D} from "../../../Datatypes/Point";

export class HorizontalLayout extends LinearLayout {
    updateChildrenPosition() {
        super.updateChildrenPosition();
        let x = 0;
        let y = 0;
        for (let child of this.children) {
            child.position = new Point2D(x, y);
            x += child.width;
        }
    }
}