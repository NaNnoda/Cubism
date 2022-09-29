// import { ButtonScene } from "./button";
// import { updateCanvas } from "./canvasManager";
// import { drawLine, drawRect, drawText, fillStyle, restoreFillStyle, restoreStrokeStyle, restoreTranslate, saveTranslate, strokeStyle } from "./canvasUtils";
// import { BrushIcon, FaceIcon } from "./icon";
// import { Point2D } from "./datatypes/point";
// import { PointerPoint } from "./pointer-point";
// import { titleBarHeight } from "./preference";
// import { Scene } from "./scene";
// import { canvas } from "./values";
//
// export class WindowScene extends Scene implements IDrawable {
//
//     height: number;
//     width: number;
//     subWindows: WindowScene[] = [];
//
//     titleBarHeight: number = 20;
//     title: string;
//     titleElements: ButtonScene[]
//
//     mouseTitleBarPos: Point2D | null;
//
//     offset: Point2D;
//
//     constructor(width: number, height: number, title: string = "New Window", offset: Point2D = new Point2D(30, 30)) {
//         super();
//         this.height = height;
//         this.width = width;
//         this.offset = offset;
//         this.title = title;
//         this.mouseTitleBarPos = null;
//         this.titleBarHeight = titleBarHeight;
//         this.titleElements = [
//             new ButtonScene(titleBarHeight, titleBarHeight)
//         ]
//         this.items.push(new FaceIcon(0, 0));
//     }
//
//     setTitle(s: string): WindowScene {
//         this.title = s;
//         return this;
//     }
//     setOffset(offset: Point2D): WindowScene {
//         this.offset = offset;
//         return this;
//     }
//     setOffsetNum(x: number, y: number): WindowScene {
//         this.setOffset(new Point2D(x, y))
//         return this;
//     }
//     setOffsetX(x: number) {
//         this.setOffsetNum(x, this.offset.y);
//         return this;
//     }
//     setOffsetY(y: number) {
//         this.setOffsetNum(this.offset.x, y);
//         return this;
//     }
//
//
//     setTitleHeight(height: number): WindowScene {
//         this.titleBarHeight = height;
//         return this;
//     }
//
//     addWindows(...windows: WindowScene[]): WindowScene {
//
//         this.subWindows.push(...windows);
//         return this;
//     }
//
//
//     isInside(point: PointerPoint): boolean {
//         return point.x > this.offset.x &&
//             point.x < this.offset.x + this.width &&
//             point.y > this.offset.y &&
//             point.y < this.offset.y + this.height;
//     }
//
//     isInTitleBar(point: PointerPoint): boolean {
//         return point.x > this.offset.x &&
//             point.x < this.offset.x + this.width &&
//             point.y > this.offset.y &&
//             point.y < this.offset.y + this.titleBarHeight;
//     }
//
//     onParentMove(point: PointerPoint): void {
//         // console.log("move", this.title, point);
//         // if (point.pressure === 0) {
//         //     return;
//         // }
//
//         if (this.mouseTitleBarPos) {
//
//
//
//
//             this.offset.x += point.x - this.mouseTitleBarPos.x;
//             this.offset.y += point.y - this.mouseTitleBarPos.y;
//             this.mouseTitleBarPos = point;
//         }
//
//         if (this.isInside(point)) {
//             let offsetPoint = this.getOffsetPoint(point);
//             for (let subWindow of this.subWindows) {
//                 subWindow.onParentMove(offsetPoint);
//             }
//         }
//         updateCanvas();
//     }
//
//     getOffsetPoint(point: PointerPoint): PointerPoint {
//         return new PointerPoint(
//             point.x - this.offset.x,
//             point.y - this.offset.y,
//             point.pressure
//         );
//     }
//
//     onParentDown(point: PointerPoint): void {
//         if (this.isInTitleBar(point)) {
//             // let titleOffsetX = point.x;
//             let buttonStartingX = this.width - this.titleElements.length * titleBarHeight;
//             for (let i = 0; i < this.titleElements.length; i++) {
//                 if (this.titleElements[i].xInRange(point.x - buttonStartingX)) {
//                     console.log("In range");
//                     return;
//                 }
//                 buttonStartingX += titleBarHeight;
//             }
//             console.log(buttonStartingX);
//             this.mouseTitleBarPos = new Point2D(point.x, point.y);
//         }
//         let offsetPoint = this.getOffsetPoint(point);
//         if (this.isInside(point)) {
//             for (let subWindow of this.subWindows) {
//                 subWindow.onParentDown(offsetPoint);
//             }
//         }
//     }
//     onParentUp(point: PointerPoint): void {
//         console.log("up", this.title, point);
//         let offsetPoint = this.getOffsetPoint(point);
//         for (let subWindow of this.subWindows) {
//             subWindow.onParentUp(offsetPoint);
//         }
//         this.mouseTitleBarPos = null;
//     }
//
//
//     draw(): void {
//         saveTranslate(this.offset);
//         this.drawBorder();
//         this.drawTitleBar();
//         super.draw();
//         this.drawSubWindows();
//         restoreTranslate();
//     }
//     drawBorder(): void {
//         drawLine(0, 0, this.width, 0);
//         drawLine(this.width, 0, this.width, this.height);
//         drawLine(this.width, this.height, 0, this.height);
//         drawLine(0, this.height, 0, 0);
//     }
//     drawTitleBar(): void {
//         drawLine(0, 0, this.width, 0);
//         drawLine(this.width, 0, this.width, this.titleBarHeight);
//         drawLine(this.width, this.titleBarHeight, 0, this.titleBarHeight);
//         drawLine(0, this.titleBarHeight, 0, 0);
//         drawText(this.title, 20, this.titleBarHeight / 2 + 3);
//
//         let buttonStartingX = this.width - this.titleElements.length * titleBarHeight;
//         for (let i = 0; i < this.titleElements.length; i++) {
//             strokeStyle("gray");
//             fillStyle("gray");
//
//
//
//             drawRect(buttonStartingX, 0, buttonStartingX + this.titleBarHeight, this.titleBarHeight)
//             // restoreFillStyle();
//             fillStyle("black");
//             fillStyle("black");
//
//             // restoreStrokeStyle();
//             buttonStartingX += this.titleBarHeight;
//         }
//     }
//     drawSubWindows(): void {
//         for (let subWindow of this.subWindows) {
//             subWindow.draw();
//         }
//     }
//
// }
//
// export let rootWindow = new WindowScene(canvas.width, canvas.height, "Root Window", new Point2D(0, 0));
//
// export function setRootWindow(newRootWindow: WindowScene) {
//     rootWindow = newRootWindow;
// }
// /**
//  * Create a new WindowScene
//  * @param width width of the Window
//  * @param height height of the Window
//  * @returns new WindowScene
//  */
// export function newWindow(width: number, height: number) {
//     return new WindowScene(width, height);
// }
