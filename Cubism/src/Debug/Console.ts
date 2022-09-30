import { Point2D } from "../Datatypes/Point";

export function initConsole() {
    let w = window as any;
    w.test = () => {
        console.log('test');
    }
    // w.addWindow = () => {
    //     rootWindow.add(
    //         new WindowScene(200, 200)
    //             .setOffset(new Point2D(20, 20))
    //     );
    // }
}
