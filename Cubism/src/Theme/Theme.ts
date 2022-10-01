import {Colors} from "./Colors";

export let defaultTheme = {
    background: Colors.white,
    strokeColor: Colors.black,
    strokeWidth: 1,
    fillColor: Colors.white,

    primary: Colors.blue500,
    secondary: Colors.cyan500,

    disabled: Colors.gray200,
    error: Colors.pureRed,
    hover: Colors.gray100,
    onClick: Colors.gray300,

    buttonBackground: Colors.white,

    textColor: Colors.black,
    textDisabled: Colors.gray200,
    textError: Colors.pureRed,
    textSecondary: Colors.cyan500,

    fontSize: 16,
    fontFamily: "Arial",
}

export class TName{
    static readonly BACKGROUND = "background";
    static readonly STROKE_COLOR = "strokeColor";
    static readonly STROKE_WIDTH = "strokeWidth";
    static readonly FILL_COLOR = "fillColor";
    static readonly PRIMARY = "primary";
    static readonly SECONDARY = "secondary";
    static readonly DISABLED = "disabled";
    static readonly ERROR = "error";
    static readonly HOVER = "hover";
    static readonly ON_CLICK = "onClick";

    static readonly BUTTON_BACKGROUND = "buttonBackground";

    static readonly TEXT_COLOR = "textColor";
    static readonly TEXT_DISABLED = "textDisabled";
    static readonly TEXT_ERROR = "textError";
    static readonly TEXT_SECONDARY = "textSecondary";

    static readonly FONT_SIZE = "fontSize";
    static readonly FONT_FAMILY = "fontFamily";

}