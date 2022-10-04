export class Values{

}
export class LayoutValues{
    public static readonly DEFAULT_PADDING = 10;
    public static readonly DEFAULT_MARGIN = 10;
    public static readonly DEFAULT_BORDER = 1;

    public static readonly MATCH_PARENT = -1;
}
export class Orientation{
    public static readonly HORIZONTAL = 1;
    public static readonly VERTICAL = 0;
}
export class Alignment{
    public static readonly START = 0;
    public static readonly END = 1;
    public static readonly CENTER = 2;
    public static readonly STRETCH = 3;
}
export class Direction{
    public static readonly LEFT = 0;
    public static readonly RIGHT = 1;
    public static readonly UP = 2;
    public static readonly DOWN = 3;
    public static readonly START = 4;
    public static readonly END = 5;
}
export class Axis{
    public static readonly X = 0;
    public static readonly Y = 1;
}
export class PointerType{
    public static readonly MOUSE = 0;
    public static readonly TOUCH = 1;
    public static readonly PEN = 2;
}
export class GEventKeys{
    public static readonly ON_MOVE = "onMove";
    public static readonly ON_DOWN = "onDown";
    public static readonly ON_UP = "onUp";

    public static readonly ON_CLICK = "onClick";
    public static readonly ON_DOUBLE_CLICK = "onDoubleClick";
    public static readonly ON_DRAG = "onDrag";
    public static readonly ON_DRAG_START = "onDragStart";
    public static readonly ON_DRAG_END = "onDragEnd";
    public static readonly ON_DRAG_ENTER = "onDragEnter";
    public static readonly ON_DRAG_LEAVE = "onDragLeave";
    public static readonly ON_DRAG_OVER = "onDragOver";
    public static readonly ON_DROP = "onDrop";
    public static readonly ON_PARENT_MOVE = "onParentMove";
    public static readonly ON_PARENT_DOWN = "onParentDown";
    public static readonly ON_PARENT_UP = "onParentUp";
    public static readonly ON_PARENT_CLICK = "onParentClick";
    public static readonly ON_ENTER = "onEnter";
    public static readonly ON_LEAVE = "onLeave";

    public static readonly FRAME_UPDATE = "onFrameUpdate";
    public static readonly FIX_UPDATE = "onFixUpdate";
    public static readonly REDRAW = "onRedraw";

    public static readonly POINTER_DOWN = "onMouseDown";
    public static readonly POINTER_UP = "onMouseUp";
    public static readonly POINTER_MOVE = "onMouseMove";
}