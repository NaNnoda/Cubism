import PointerHandlerParentElement from "../PointerHanderParentElement";
import {Colors} from "../../Theme/Colors";
import {PointerPoint} from "../../Datatypes/PointerPoint";
import {Point2D} from "../../Datatypes/Point";

export default class RecursiveRect extends PointerHandlerParentElement {
    lastPoint: PointerPoint | null = null;

    recursionCount :number

    constructor(recursionCount: number = 10, width: number = 200, height: number = 200) {
        super();

        this.width = width;
        this.height = height;
        this.recursionCount = recursionCount;
        // if (recursionCount > 1) {
        //     console.log(`Creating RecursiveRect with recursionCount ${recursionCount}`);
        //     this.addChildren(
        //         new RecursiveRect(recursionCount - 1, width , height)
        //     );
        // }
    }

    // updateChildrenPosition() {
    //     for (let child of this.children) {
    //         child.position = this.position.subXY(-5, -5);
    //     }
    //     // super.updateChildrenPosition();
    // }

    draw() {
        // console.log(`Drawing RecursiveRect with recursionCount ${this.recursionCount}`);
        this.c.translate(
            this.position
            );
        // this.c.setFillStyle(Colors.green100);
        // this.c.drawRect(0 , 0, this.width, this.height);
        // this.drawChildren();

        this.c.setFillStyle(Colors.green100);
        this.c.setStrokeWidth(2);
        this.c.setStrokeStyle(Colors.green700);
        let relaPos = this.position.subXY(100, 100);
        let relaSpeed = 0.2;
        let relaSize = 10;

        this.c.drawRect(0 , 0, this.width , this.height );

        let pos = new Point2D(0, 0);

        for (let i = 1; i <this.recursionCount+1; i++) {
            let relaSpeedI =relaSpeed*i;
            let relaSizeI =relaSize*i;
            this.c.translate(relaPos.scale(relaSpeedI));
            // console.log(`Drawing RecursiveRect with recursionCount ${this.recursionCount} relaI ${relaSpeedI}`);
            this.c.drawRect(relaSizeI , relaSizeI, this.width - relaSizeI, this.height -relaSizeI);
            this.c.restoreTranslate();
            // this.c.translate(new Point2D(5, 5));
        }
        this.c.restoreTranslate();
    }
    onMove(point: PointerPoint) {
        // console.log(`onMove ${this}`);
        if (point.pressure > 0) {
            if (!this.lastPoint) {
                this.lastPoint = point.sub(this.position);
            }
            this.position = point.sub(this.lastPoint);
            // this.position = point;
        } else {
            this.lastPoint = null;
        }
    }

    //
    // triggerThisPointerEvent(point: PointerPoint) {
    //     super.triggerThisPointerEvent(point);
    // }
    //
    triggerChildrenPointerEvent(point: PointerPoint) {
        // super.triggerChildrenPointerEvent(point);
    }
}
