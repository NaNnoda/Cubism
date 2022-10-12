import {CanvasDrawer} from "../CanvasDrawer";
import {PointerPoint} from "../Datatypes/PointerPoint";

import {ColorTheme, CubismElementThemeRoot, FontTheme, OnClickColorTheme, OnHoverColorTheme} from "../Theme/Theme";
import PointerHandlerParentElement from "./PointerHanderParentElement";

export class ThemedElement extends PointerHandlerParentElement {
    _currTheme: CubismElementThemeRoot

    defaultTheme: CubismElementThemeRoot
    hoverTheme: CubismElementThemeRoot
    pressedTheme: CubismElementThemeRoot

    setFontTheme(theme: FontTheme): ThemedElement {
        this.defaultTheme.font = theme;
        this.hoverTheme.font = theme;
        this.pressedTheme.font = theme;
        return this;
    }

    get currTheme(): CubismElementThemeRoot {
        return this._currTheme;
    }

    set currTheme(theme: CubismElementThemeRoot) {

        this._currTheme = theme;
    }

    constructor() {
        super();
        this.defaultTheme = new CubismElementThemeRoot(
            new ColorTheme()
        );
        this.hoverTheme = new CubismElementThemeRoot(
            new OnHoverColorTheme()
        );
        this.pressedTheme = new CubismElementThemeRoot(
            new OnClickColorTheme()
        )
        this._currTheme = this.defaultTheme;
        this.currTheme = this.defaultTheme;
    }

    onMove(point: PointerPoint): void {
        super.onMove(point);
        this.c?.setRedraw(true);
    }

    onDown(point: PointerPoint): void {
        super.onDown(point);
        this.c?.setRedraw(true);
    }

    onUp(point: PointerPoint) {
        super.onUp(point);
        this.c?.setRedraw(true);
    }

    onEnter(point: PointerPoint) {
        super.onEnter(point);
        this.c?.setRedraw(true);
    }

    onLeave(point: PointerPoint) {
        super.onLeave(point);
        this.c?.setRedraw(true);
    }


    setDefaultTheme(theme: CubismElementThemeRoot): ThemedElement {
        this.defaultTheme = theme;
        return this;
    }

    setHoverTheme(theme: CubismElementThemeRoot): ThemedElement {
        this.hoverTheme = theme;
        return this;
    }

    setPressTheme(theme: CubismElementThemeRoot): ThemedElement {
        this.pressedTheme = theme;
        return this;
    }


    draw(): void {
        super.draw();
        let c = this.c as CanvasDrawer;
        c.translate(this.position);

        this.currTheme = this.defaultTheme;

        if (this.hovered) {
            this.currTheme = this.hoverTheme;
        }

        if (this.pressed) {
            this.currTheme = this.pressedTheme;
        }

        c.setFillStyle(this.currTheme.color.background);
        c.setStrokeStyle(this.currTheme.color.border);

        // console.log("this.currTheme", this.currTheme);
        // console.log("absSize", this.absSize);

        c.drawRectWithPoints(this.absSize);
        c.restoreTranslate();
    }
}
