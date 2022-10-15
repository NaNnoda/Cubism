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

    // _layout: VerticalLayout | undefined;
    //
    // get layout(): VerticalLayout {
    //     if (this._layout === undefined) {
    //         this._layout = new VerticalLayout();
    //     }
    //     return this._layout;
    // }

    draw() {
        super.draw();
        this.c.translate(this.position);
        this.c.ctx.strokeRect(0, 0, this.width, this.height);
        if (this.icon !== null) {
            this.icon.draw();
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
