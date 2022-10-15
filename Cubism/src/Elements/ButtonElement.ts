import {PointerInteractThemeElement} from "./Basic/PointerInteractThemeElement";
import BasicIcon from "./Icons/BasicIcon";
import {VerticalLayout} from "./Layouts/VerticalLayout";
import {TextElement} from "./TextElement";

export class ButtonElement extends PointerInteractThemeElement {
    _icon: BasicIcon | null = null;
    _text: TextElement | null = null;

    set icon(icon: BasicIcon | null) {
        this._icon = icon;

        if (icon !== null) {
            this.addChildren(icon);
        }
    }

    get icon(): BasicIcon | null {
        return this._icon;
    }

    get text(): TextElement | null {
        return this._text;
    }

    set text(text: TextElement | null) {
        this._text = text;
        if (text !== null) {
            if (this.icon !== null) {
                text.position.x += this.icon.width;
            }
            this.addChildren(text);
        }
    }

    draw() {
        // super.draw();
        this.updateCanvasDrawerTheme();
        this.c.translate(this.position);
        this.c.drawRectWithPoints(this.size);
        if (this.icon !== null) {
            this.icon.draw();
        }
        if (this.text !== null) {
            this.text.draw();
        }
        this.c.restoreTranslate();
    }

    internalAddChildren() {
        super.internalAddChildren();
        // this.addChildren(this.layout);
    }

    setIcon(icon: BasicIcon) {
        this.icon = icon;
        return this;
    }

    setText(text: string | TextElement) {
        if (typeof text === "string") {
            text = new TextElement(text);
        }
        this.text = text;
        return this;
    }
}
