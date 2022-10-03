import {Colors} from "./Colors";

class Theme {
    color: ColorTheme;
    font: FontTheme;
    constructor(color: ColorTheme, font: FontTheme) {
        this.color = color;
        this.font = font;
    }
}

class ColorTheme {
    primary: string = Colors.blue500;
    secondary: string = Colors.blue700;
    background: string = Colors.white;
    text: string = Colors.black;
}
class OnClickColorTheme extends ColorTheme {
    background: string = Colors.grey700;
}
class OnHoverColorTheme extends ColorTheme {
    background: string = Colors.grey300;
}


class FontTheme {
    fontSizes: number = 14;
    fontFamily: string = "Arial";
}