import {Colors} from "./Colors";

export class CubismElementThemeRoot {
    color: ColorTheme;
    font: FontTheme;
    constructor(color: ColorTheme = new ColorTheme(), font: FontTheme = new FontTheme()) {
        this.color = color;
        this.font = font;
    }
}

export class ColorTheme {
    primary: string = Colors.blue500;
    setPrimary(color: string) {
        this.primary = color;
        return this;
    }
    secondary: string = Colors.blue700;
    setSecondary(color: string) {
        this.secondary = color;
        return this;
    }
    background: string = Colors.white;
    setBackground(color: string) {
        this.background = color;
        return this;
    }
    border: string = this.primary;
    setBorder(color: string) {
        this.border = color;
        return this;
    }

    text: string = Colors.black;
    setText(color: string) {
        this.text = color;
        return this;
    }
}
export class OnClickColorTheme extends ColorTheme {
    background: string = Colors.grey200;
}
export class OnHoverColorTheme extends ColorTheme {
    background: string = Colors.grey100;
}


export class FontTheme {
    fontSizes: number = 14;
    fontFamily: string = "Arial";
}