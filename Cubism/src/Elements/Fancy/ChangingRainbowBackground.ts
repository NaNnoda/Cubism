import PointerHandlerParentElement from "../PointerHanderParentElement";
import {CubismElement} from "../CubismElement";
import {Colors} from "../../Theme/Colors";
import {EventKeys} from "../../Constants/Constants";
import {Cubism} from "../../Cubism";

export class ChangingRainbowBackground extends CubismElement{
    frameCount: number = 0;

    saturation:number = 70;
    lightness: number = 90;

    setSaturation(s: number) {
        if (s > 100) {
            s = 100;
        }
        this.saturation = s;
        return this;
    }
    setLightness(l: number) {
        if (l > 100) {
            l = 100;
        }
        this.lightness = l;
        return this;
    }

    constructor() {
        super();

    }
    // setCubism(cubism: Cubism) {
    //     super.setCubism(cubism);
    //     this.cubism.eventSystem.registerEvent(EventKeys.FRAME_UPDATE, this.frameUpdate.bind(this));
    // }

    // frameUpdate() {
    //     this.c.setRedraw(true);
    //     this.frameCount++;
    // }

    draw() {
        this.frameCount++;
        this.c.translate(this.position);
        // console.log("Drawing Background");
        // console.log("Background", this);
        let currHue = this.frameCount % 360;
        let currColor = `hsl(${currHue}, ${this.saturation}%, ${this.lightness}%)`;
        // console.log("currColor", currColor);
        this.c.setFillStyle(currColor);
        this.c.setStrokeWidth(0);
        this.c.setStrokeStyle(currColor);
        this.c.drawRect(0, 0, this.absWidth, this.absHeight);
        // super.draw();
        this.c.restoreTranslate();
    }
}
