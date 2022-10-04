import {Cubism} from "./Cubism";
import {VerticalLayout} from "./Elements/Layouts/VerticalLayout";
import {ColorTheme} from "./Theme/Theme";
import {Colors} from "./Theme/Colors";
import {ButtonElement} from "./Elements/ButtonElement";
import {CubismElement} from "./Elements/CubismElement";
import {PointerHandleableElement} from "./Elements/PointerHandleableElement";
import {DraggableRect} from "./Elements/DraggableRect";

export class CubismBuilder{

    get cubism(){
        return Cubism;
    }
    get c(){
        return this.cubism;
    }
    verticalLayout(...children: PointerHandleableElement[]){
        return new VerticalLayout(...children);
    }

    v(...children: PointerHandleableElement[]){
        return this.verticalLayout(...children);
    }

    get colorTheme(){
        return new ColorTheme;
    }

    colors(){
        return Colors;
    }
    get button(){
        return new ButtonElement();
    }

    get draggableRect(){
        return new DraggableRect();
    }
}