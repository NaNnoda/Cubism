import {Cubism} from "./Cubism";
import {VerticalLayout} from "./Elements/Layouts/VerticalLayout";
import {ColorTheme, CubismElementThemeRoot, FontTheme} from "./Theme/Theme";
import {Colors} from "./Theme/Colors";
import {ButtonElement} from "./Elements/ButtonElement";
import {CubismElement} from "./Elements/CubismElement";
import {PointerHandleableElement} from "./Elements/PointerHandleableElement";
import {DraggableRect} from "./Elements/DraggableRect";
import {HorizontalLayout} from "./Elements/Layouts/HorizontalLayout";

export class CubismBuilder{

    toString(){
        return "CubismBuilder";
    }

    get cubism(){
        return Cubism;
    }
    get c(){
        return this.cubism;
    }
    verticalLayout(...children: PointerHandleableElement[]){
        return new VerticalLayout(...children);
    }
    horizontalLayout(...children: PointerHandleableElement[]){
        return new HorizontalLayout(...children);
    }
    h(...children: PointerHandleableElement[]){
        return this.horizontalLayout(...children);
    }

    v(...children: PointerHandleableElement[]){
        return this.verticalLayout(...children);
    }

    get colorTheme(){
        return new ColorTheme;
    }
    get fontTheme(){
        return new FontTheme();
    }
    get theme(){
        return new CubismElementThemeRoot();
    }


    get colors(){
        return Colors;
    }
    get button(){
        return new ButtonElement();
    }
    buttonWithText(text: string){
        return new ButtonElement(text);
    }

    get draggableRect(){
        return new DraggableRect();
    }
}