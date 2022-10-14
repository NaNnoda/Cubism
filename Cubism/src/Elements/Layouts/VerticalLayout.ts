import {LinearLayout} from "./LinearLayout";
import {Point2D} from "../../Datatypes/Point";

export class VerticalLayout extends LinearLayout {
    updateChildrenPosition() {
        let maxChildWidth = 0;
        super.updateChildrenPosition();
        let x = 0;
        let y = 0;
        for (let child of this.children) {
            child.position = new Point2D(x, y);
            if (child.width > maxChildWidth) {
                maxChildWidth = child.width;
            }
            y += child.height;
        }
        this.absWidth = maxChildWidth;
        this.absHeight = y;
    }
    // pointerInRange(point: Point2D): boolean {
    //
    //     if (point.x >= this.position.x && point.x <= this.getMaxWidth() + this.position.x) {
    //         if (point.y >= this.position.y && point.y <= this.getCumulativeHeight() + this.position.y) {
    //             console.log(`Pointer in range of ${this}`);
    //             return true;
    //         }
    //     }
    //     return false;
    // }
}