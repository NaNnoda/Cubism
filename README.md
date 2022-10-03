![image](/Assets/icon.png)
# Cubism
HTML Canvas based UI framework

## Example
Code:
```typescript
/**
 * Demo of a simple layout
 */
function main() {
    let canvas = document.getElementById("mainCanvas") as HTMLCanvasElement;
    let c = Cubism.createFromCanvas(canvas);
    c.init(
        new VerticalLayout(
            new DraggableRect()
                .setWidth(100)
                .setHeight(100)
                .setBackgroundColor(Colors.blue500)
                .setLineWidth(5),
            new DraggableRect()
                .setWidth(100)
                .setHeight(100)
                .setBackgroundColor(Colors.green200)
                .setLineWidth(5),
            new ButtonElement("Button")
                .setHeight(50)
                .setWidth(100)
                .setLineWidth(5),
        )
    );
}
```
Output:

![image](https://user-images.githubusercontent.com/114621472/193383887-5963361f-698a-4741-ac91-29af25f7ad0b.png)



