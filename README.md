# Cubism
HTML Canvas based UI framework

## Example
Code:
```typescript

/**
 * entry point
 */
function main() {
    let c = CubismCanvasManager.createFromId("mainCanvas");
    c.init(
        new LayoutElement(
            new RectangleElement()
                .setWidth(100)
                .setHeight(100)
                .setBackgroundColor("red")
                .setPosFromXY(0, 0),
            new RectangleElement()
                .setWidth(100)
                .setHeight(100)
                .setBackgroundColor("blue")
                .setPosFromXY(40, 40),
            new RectangleElement()
                .setWidth(100)
                .setHeight(100)
                .setBackgroundColor("green")
                .setPosFromXY(80, 80),
        )
    )
}
```
Output:

![image](https://user-images.githubusercontent.com/114621472/192913392-a6a97178-f27b-4974-8c52-04ce393839cb.png)


