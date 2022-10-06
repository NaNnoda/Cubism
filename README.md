![image](/Assets/favicon-32x32.png)

# Cubism


HTML Canvas based UI framework

## Example
### Basic Layout
```typescript
/**
 * Demo of a simple layout
 */
function defaultInitCode(b: CubismBuilder) {
    console.log(`Builder is ${b}`)
    b.cubism.createFromId("mainCanvas")
        .init(
        b.v(
            b.draggableRect
                .setWidth(100)
                .setHeight(100),
            b.draggableRect
                .setWidth(100)
                .setHeight(100)
                .setHoverTheme(
                    b.theme
                        .setColorTheme(
                            b.colorTheme.setBackground(b.colors.red100)
                        )
                )
                .setPressTheme(
                    b.theme
                        .setColorTheme(
                            b.colorTheme.setBackground(b.colors.red300)
                        )
                ),
            b.button
                .setText("Button")
                .setHeight(50)
                .setWidth(100)
        )
    )
}
```
Output:

<img width="317" alt="image" src="https://user-images.githubusercontent.com/114621472/194082209-d207383e-9816-4c13-a0c9-d11d319b087d.png">


```typescript

let app = Cubism.createFromId("mainCanvas");
app.init(
  new VerticalLayout(
    new DraggableRect().setWidth(100).setHeight(100),
    new DraggableRect().setWidth(100).setHeight(100),
    new ButtonElement().setText("Button").setHeight(50).setWidth(100).pushOnUp(() => {
      let v = app.getElementById("VerticalLayout");
      v.pushChildren(
        new DraggableRect().setWidth(10).setHeight(10)
      );
    })
  ).setId("VerticalLayout")
);
```
Output:

Before clicks:

![image](https://user-images.githubusercontent.com/114621472/194417006-bb3d94a7-37f3-49d0-bbf4-e9082ec9ce22.png)

After clicks:

![image](https://user-images.githubusercontent.com/114621472/194416927-0d4d3e56-f629-4d4e-8d26-933d47ba362e.png)


Try it out in [here](/Cubism/index.html)

