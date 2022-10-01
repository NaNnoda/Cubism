# Cubism
HTML Canvas based UI framework

## Examples

### VerticalLayout
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

![image](https://user-images.githubusercontent.com/34388992/193383469-02e7d9b5-107c-4b7c-b1f9-1c97fe0782ee.png)

### HorizontalLayout
Code:
```typescript
/**
 * Demo of a simple layout
 */
function main() {
    let canvas = document.getElementById("mainCanvas") as HTMLCanvasElement;
    let c = Cubism.createFromCanvas(canvas);
    c.init(
        new HorizontalLayout(
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

![image](https://user-images.githubusercontent.com/34388992/193382577-52f6bd7f-a816-4d34-8612-4ad61e4bcac9.png)
