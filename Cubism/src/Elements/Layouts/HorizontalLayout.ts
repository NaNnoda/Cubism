import {LinearLayout} from "./LinearLayout";
import {Point2D} from "../../Utils/Math/Point";

export class HorizontalLayout extends LinearLayout {
    updateChildrenPosition() {
        let maxChildHeight = 0;
        super.updateChildrenPosition();
        let x = 0;
        let y = 0;
        for (let child of this.children) {
            child.position = new Point2D(x, y);
            if (child.height > maxChildHeight) {
                maxChildHeight = child.height;
            }
            x += child.width;
        }
        this.absHeight = maxChildHeight;
        this.absWidth = x;
    }
}
