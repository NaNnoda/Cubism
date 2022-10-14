import {Colors} from "../Constants/Colors";

export default class BasicTheme{
    fillStyle: string;
    strokeStyle: string;
    lineWidth: number;

    constructor(fillStyle: string =Colors.white, strokeStyle: string = Colors.blue700, lineWidth: number = 2) {
        this.fillStyle = fillStyle;
        this.strokeStyle = strokeStyle;
        this.lineWidth = lineWidth;
    }
}
