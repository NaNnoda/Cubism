![image](/Assets/favicon-32x32.png)

# Cubism


HTML Canvas based UI framework

## Example
Code:
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




