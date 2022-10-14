import PointerHandlerParentElement from "../PointerHanderParentElement";
import {CubismElement} from "../CubismElement";
import {Colors} from "../../Constants/Colors";
import {Cubism} from "../../Cubism";
import {needsRedrawAccessor} from "../../NeedsRedraw";

export class ChangingRainbowBackground extends CubismElement{
    _frameCount: number = 0;

    get frameCount(): number {
        return this._frameCount;
    }
    @needsRedrawAccessor()
    set frameCount(frameCount: number) {
        this._frameCount = frameCount;
    }

    saturation:number = 70;
    _lightness: number = 90;
    changingSpeed: number = 0.2;
    @needsRedrawAccessor()
    set lightness(l: number) {
        this._lightness = l;
    }

    setSaturation(s: number) {
        if (s > 100) {
            s = 100;
        }
        this.saturation = s;
        return this;
    }
    setChangingSpeed(speed: number) {
        this.changingSpeed = speed;
        return this;
    }
    setLightness(l: number) {
        if (l > 100) {
            l = 100;
        }
        this.lightness = l;
        return this;
    }
    draw() {
        this.frameCount++;
        this.c.translate(this.position);
        let currHue = this.frameCount * this.changingSpeed % 360;
        let currColor = `hsl(${currHue}, ${this.saturation}%, ${this.lightness}%)`;

        this.c.setFillStyle(currColor);
        this.c.setStrokeWidth(0);
        this.c.setStrokeStyle(currColor);
        this.c.drawRect(0, 0, this.absWidth, this.absHeight);
        // super.draw();
        this.c.restoreTranslate();
    }
}
