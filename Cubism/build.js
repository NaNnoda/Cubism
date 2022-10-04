// src/Datatypes/TransformMatrix2D.ts
var TransformMatrix2D = class {
  constructor(m11, m12, m21, m22, dx, dy) {
    this.arr = [];
    this.arr = [
      [m11, m12, dx],
      [m21, m22, dy],
      [0, 0, 1]
    ];
  }
  get m11() {
    return this.arr[0][0];
  }
  set m11(value) {
    this.arr[0][0] = value;
  }
  get m12() {
    return this.arr[0][1];
  }
  set m12(value) {
    this.arr[0][1] = value;
  }
  get m21() {
    return this.arr[1][0];
  }
  set m21(value) {
    this.arr[1][0] = value;
  }
  get m22() {
    return this.arr[1][1];
  }
  set m22(value) {
    this.arr[1][1] = value;
  }
  get dx() {
    return this.arr[0][2];
  }
  set dx(value) {
    this.arr[0][2] = value;
  }
  get dy() {
    return this.arr[1][2];
  }
  set dy(value) {
    this.arr[1][2] = value;
  }
  static makeFromArray(arr) {
    return new TransformMatrix2D(arr[0][0], arr[0][1], arr[1][0], arr[1][1], arr[0][2], arr[1][2]);
  }
  get(x, y) {
    return this.arr[x][y];
  }
  set(x, y, value) {
    this.arr[x][y] = value;
  }
  static identity() {
    return new TransformMatrix2D(1, 0, 0, 1, 0, 0);
  }
  static zero() {
    return new TransformMatrix2D(0, 0, 0, 0, 0, 0);
  }
  static translation(x, y) {
    return new TransformMatrix2D(1, 0, 0, 1, x, y);
  }
  static rotation(angle) {
    let cos = Math.cos(angle);
    let sin = Math.sin(angle);
    return new TransformMatrix2D(cos, -sin, sin, cos, 0, 0);
  }
  static scale(x, y) {
    return new TransformMatrix2D(x, 0, 0, y, 0, 0);
  }
  clone() {
    return new TransformMatrix2D(this.m11, this.m12, this.m21, this.m22, this.dx, this.dy);
  }
  multiply(other) {
    let newMatrix = TransformMatrix2D.zero();
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let dotProduct = 0;
        for (let k = 0; k < 3; k++) {
          dotProduct += this.get(i, k) * other.get(k, j);
        }
        newMatrix.set(i, j, dotProduct);
      }
    }
    return newMatrix;
  }
  translate(x, y) {
    return this.multiply(TransformMatrix2D.translation(x, y));
  }
  rotate(angle) {
    return this.multiply(TransformMatrix2D.rotation(angle));
  }
  scale(x, y) {
    return this.multiply(TransformMatrix2D.scale(x, y));
  }
  toString() {
    return `(${this.m11}, ${this.m12}, ${this.dx})
(${this.m21}, ${this.m22}, ${this.dy})`;
  }
};

// src/State.ts
var CubismCanvasState = class {
  constructor(canvas, ctx) {
    this.translates = [TransformMatrix2D.identity()];
    this._needsRedraw = true;
    this.canvas = canvas;
    this.ctx = ctx;
  }
  set translate(offset) {
    let translateMatrix = this.translateMatrix.translate(offset.x, offset.y);
    this.translates.push(translateMatrix);
    this.setCtxTransform(translateMatrix);
  }
  setCtxTransform(t) {
    this.ctx.setTransform(t.m11, t.m12, t.m21, t.m22, t.dx, t.dy);
  }
  restoreTranslate() {
    let lastTranslate = this.popTranslate();
    this.setCtxTransform(lastTranslate);
  }
  get translateMatrix() {
    return this.translates[this.translates.length - 1];
  }
  popTranslate() {
    if (this.translates.length > 1) {
      return this.translates.pop();
    }
    return this.translates[0];
  }
  get needsRedraw() {
    return this._needsRedraw;
  }
  set needsRedraw(value) {
    this._needsRedraw = value;
  }
};

// src/Constants/Constants.ts
var LayoutValues = class {
};
LayoutValues.DEFAULT_PADDING = 10;
LayoutValues.DEFAULT_MARGIN = 10;
LayoutValues.DEFAULT_BORDER = 1;
LayoutValues.MATCH_PARENT = -1;
var Orientation = class {
};
Orientation.HORIZONTAL = 1;
Orientation.VERTICAL = 0;
var Alignment = class {
};
Alignment.START = 0;
Alignment.END = 1;
Alignment.CENTER = 2;
Alignment.STRETCH = 3;
var Direction = class {
};
Direction.LEFT = 0;
Direction.RIGHT = 1;
Direction.UP = 2;
Direction.DOWN = 3;
Direction.START = 4;
Direction.END = 5;
var Axis = class {
};
Axis.X = 0;
Axis.Y = 1;
var PointerType = class {
};
PointerType.MOUSE = 0;
PointerType.TOUCH = 1;
PointerType.PEN = 2;
var GEventKeys = class {
};
GEventKeys.ON_MOVE = "onMove";
GEventKeys.ON_DOWN = "onDown";
GEventKeys.ON_UP = "onUp";
GEventKeys.ON_CLICK = "onClick";
GEventKeys.ON_DOUBLE_CLICK = "onDoubleClick";
GEventKeys.ON_DRAG = "onDrag";
GEventKeys.ON_DRAG_START = "onDragStart";
GEventKeys.ON_DRAG_END = "onDragEnd";
GEventKeys.ON_DRAG_ENTER = "onDragEnter";
GEventKeys.ON_DRAG_LEAVE = "onDragLeave";
GEventKeys.ON_DRAG_OVER = "onDragOver";
GEventKeys.ON_DROP = "onDrop";
GEventKeys.ON_PARENT_MOVE = "onParentMove";
GEventKeys.ON_PARENT_DOWN = "onParentDown";
GEventKeys.ON_PARENT_UP = "onParentUp";
GEventKeys.ON_PARENT_CLICK = "onParentClick";
GEventKeys.ON_ENTER = "onEnter";
GEventKeys.ON_LEAVE = "onLeave";
GEventKeys.FRAME_UPDATE = "onFrameUpdate";
GEventKeys.FIX_UPDATE = "onFixUpdate";
GEventKeys.REDRAW = "onRedraw";
GEventKeys.POINTER_DOWN = "onMouseDown";
GEventKeys.POINTER_UP = "onMouseUp";
GEventKeys.POINTER_MOVE = "onMouseMove";

// src/CanvasDrawer.ts
var CanvasDrawer = class {
  constructor(canvas, globalEvent) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.state = new CubismCanvasState(canvas, this.ctx);
    this.globalEvent = globalEvent;
    this.registerFrameUpdate();
  }
  get width() {
    return this.canvas.width;
  }
  set width(width) {
    this.canvas.width = width;
  }
  get height() {
    return this.canvas.height;
  }
  set height(height) {
    this.canvas.height = height;
  }
  registerFrameUpdate() {
    this.globalEvent.registerGlobalEvent(GEventKeys.FRAME_UPDATE, this.frameUpdate.bind(this));
  }
  frameUpdate() {
    if (this.state.needsRedraw) {
      this.triggerRedraw();
      this.state.needsRedraw = false;
    }
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  setFillStyle(style) {
    this.ctx.fillStyle = style;
  }
  setStrokeStyle(style) {
    this.ctx.strokeStyle = style;
  }
  setStrokeWidth(width) {
    this.ctx.lineWidth = width;
  }
  translate(offset) {
    this.state.translate = offset;
  }
  restoreTranslate() {
    this.state.restoreTranslate();
  }
  fillText(text, x, y) {
    this.ctx.fillText(text, x, y);
  }
  drawLineWithPoints(begin, end) {
    this.drawLine(begin.x, begin.y, end.x, end.y);
  }
  drawLine(beginX, beginY, endX, endY) {
    this.ctx.beginPath();
    this.ctx.moveTo(beginX, beginY);
    this.ctx.lineTo(endX, endY);
    this.closeDraw();
  }
  drawCircle(x, y, radius) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.closeDraw();
  }
  drawShape(points) {
    this.ctx.beginPath();
    this.ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      this.ctx.lineTo(points[i].x, points[i].y);
    }
    this.closeDraw();
  }
  drawRectWithPoints(p1, p2 = null) {
    if (p2 === null) {
      this.drawRect(0, 0, p1.x, p1.y);
    } else {
      this.drawRect(p1.x, p1.y, p2.x, p2.y);
    }
  }
  drawRect(x, y, width, height) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(width, y);
    this.ctx.lineTo(width, height);
    this.ctx.lineTo(x, height);
    this.closeDraw();
  }
  drawPathString(path) {
    this.drawPath(new Path2D(path));
  }
  drawPath(path) {
    this.ctx.stroke(path);
  }
  closeDraw() {
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
  }
  setRedraw(redraw) {
    this.state.needsRedraw = redraw;
  }
  triggerRedraw() {
    this.globalEvent.triggerGlobalEvent(GEventKeys.REDRAW);
  }
};

// src/Events/CubismGlobalEventSystem.ts
var CubismGlobalEventSystem = class {
  constructor() {
    this._globalEventListeners = {};
  }
  registerGlobalEvent(event, callback) {
    this.getEvent(event).push(callback);
  }
  unregisterGlobalEvent(event, callback) {
    this._globalEventListeners[event].splice(this._globalEventListeners[event].indexOf(callback), 1);
  }
  getEvent(event) {
    if (this._globalEventListeners[event] === void 0) {
      this._globalEventListeners[event] = [];
      this._globalEventListeners[event].push(() => {
      });
    }
    return this._globalEventListeners[event];
  }
  triggerGlobalEvent(event, ...args) {
    this.getEvent(event).forEach((callback) => {
      callback(...args);
    });
  }
};

// src/Events/CubismEventManager.ts
var CubismEventManager = class {
  constructor(globalEvent) {
    this.globalEvent = globalEvent;
    this.startFixedUpdate();
    this.startFrameUpdate();
  }
  startFixedUpdate() {
    setInterval(this.doFixUpdate.bind(this), 1e3 / 60);
  }
  doFixUpdate() {
    this.globalEvent.triggerGlobalEvent(GEventKeys.FIX_UPDATE);
  }
  startFrameUpdate() {
    this.globalEvent.triggerGlobalEvent(GEventKeys.FRAME_UPDATE);
    window.requestAnimationFrame(this.startFrameUpdate.bind(this));
  }
};

// src/Datatypes/Point.ts
var Point2D = class {
  constructor(x, y) {
    this.arr = [x, y];
  }
  get x() {
    return this.arr[0];
  }
  set x(value) {
    this.arr[0] = value;
  }
  get y() {
    return this.arr[1];
  }
  set y(value) {
    this.arr[1] = value;
  }
  clone() {
    return new Point2D(this.x, this.y);
  }
  offset(offset) {
    this.x += offset.x;
    this.y += offset.y;
    return this;
  }
  nOffset(offset) {
    this.x -= offset.x;
    this.y -= offset.y;
    return this;
  }
  add(other) {
    return this.clone().offset(other);
  }
  sub(other) {
    return this.clone().nOffset(other);
  }
  mul(other) {
    return new Point2D(this.x * other.x, this.y * other.y);
  }
  scale(n) {
    return new Point2D(this.x * n, this.y * n);
  }
  toString() {
    return `(${this.x}, ${this.y})`;
  }
};

// src/Elements/CubismElement.ts
var CubismElement = class {
  constructor() {
    this.globalEvent = null;
    this._position = new Point2D(0, 0);
    this._size = new Point2D(LayoutValues.MATCH_PARENT, LayoutValues.MATCH_PARENT);
    this._absSize = new Point2D(0, 0);
    this.c = null;
    this.needsResize = true;
  }
  set position(pos) {
    var _a;
    this._position = pos;
    (_a = this.c) == null ? void 0 : _a.setRedraw(true);
  }
  get position() {
    return this._position;
  }
  get size() {
    return this._size;
  }
  set size(size) {
    var _a;
    this._size = size;
    this.needsResize = true;
    (_a = this.c) == null ? void 0 : _a.setRedraw(true);
  }
  get absSize() {
    return this._absSize;
  }
  set absSize(size) {
    var _a;
    this._absSize = size;
    (_a = this.c) == null ? void 0 : _a.setRedraw(true);
  }
  init(c, parentSize, globalEvent) {
    this.setCanvasDrawer(c);
    this.updateShape(parentSize.x, parentSize.y);
    this.setGlobalEventSystem(globalEvent);
  }
  setGlobalEventSystem(globalEvent) {
    this.globalEvent = globalEvent;
  }
  updateShape(x, y) {
    this.absWidth = x;
    this.absHeight = y;
    this.needsResize = false;
  }
  get height() {
    return this.size.y;
  }
  set height(y) {
    this.size.y = y;
    this.needsResize = true;
  }
  get width() {
    return this.size.x;
  }
  set width(x) {
    this.size.x = x;
    this.needsResize = true;
  }
  get absWidth() {
    return this.absSize.x;
  }
  set absWidth(x) {
    this.absSize.x = x;
  }
  get absHeight() {
    return this.absSize.y;
  }
  set absHeight(y) {
    this.absSize.y = y;
  }
  setCanvasDrawer(c) {
    this.c = c;
  }
  setWidth(width) {
    this.width = width;
    return this;
  }
  setHeight(height) {
    this.height = height;
    return this;
  }
  setPosFromPoint(pos) {
    this.position = pos;
    return this;
  }
  setPosFromXY(x, y) {
    this.position.x = x;
    this.position.y = y;
    return this;
  }
  render() {
    if (this.c === null) {
      throw new Error("CubismElement.render(): CubismCanvasManager is null");
    }
  }
  toString() {
    return `${this.elementName} abs(${this.absWidth}x${this.absHeight}) rel(${this.width}x${this.height})`;
  }
  get elementName() {
    return this.constructor.name;
  }
};

// src/Elements/InteractiveElement.ts
var InteractiveElement = class extends CubismElement {
  constructor() {
    super(...arguments);
    this.events = {};
  }
  pushOn(event, ...callbacks) {
    if (this.events[event] === void 0) {
      this.events[event] = [];
    }
    this.events[event].push(...callbacks);
  }
  getOn(event) {
    return this.events[event];
  }
  removeOn(event, callback) {
    this.events[event].splice(this.events[event].indexOf(callback), 1);
  }
};

// src/Elements/PointerHandleableElement.ts
var PointerHandleableElement = class extends InteractiveElement {
  constructor() {
    super();
    this._pointerWasNotInRange = true;
    this._hovered = false;
    this._pressed = false;
    this.pushOnParentMove((point) => {
      this.onParentMove(point);
    });
    this.pushOnParentDown((point) => {
      this.onParentDown(point);
    });
    this.pushOn(GEventKeys.ON_MOVE, (point) => {
      this.onMove(point);
    });
    this.pushOn(GEventKeys.ON_PARENT_DOWN, (point) => {
      this.onParentDown(point);
    });
    this.pushOn(GEventKeys.ON_DOWN, (point) => {
      this.onDown(point);
    });
    this.pushOn(GEventKeys.ON_PARENT_UP, (point) => {
      this.onParentUp(point);
    });
    this.pushOn(GEventKeys.ON_UP, (point) => {
      this.onUp(point);
    });
    this.pushOn(GEventKeys.ON_ENTER, (point) => {
      this.onEnter(point);
    });
    this.pushOn(GEventKeys.ON_LEAVE, (point) => {
      this.onLeave(point);
    });
  }
  get pressed() {
    return this._pressed;
  }
  set pressed(value) {
    this._pressed = value;
  }
  get hovered() {
    return this._hovered;
  }
  set hovered(value) {
    this._hovered = value;
  }
  triggerOnParentDown(point) {
    let e = this.getOn(GEventKeys.ON_PARENT_DOWN);
    for (let callback of e) {
      callback(point);
    }
  }
  onParentDown(point) {
    if (this.inRange(point)) {
      this.triggerOnDown(point);
    }
  }
  triggerOnParentUp(point) {
    let e = this.getOn(GEventKeys.ON_PARENT_UP);
    for (let callback of e) {
      callback(point);
    }
  }
  onParentUp(point) {
    if (this.inRange(point)) {
      this.triggerOnUp(point);
    }
  }
  triggerOnUp(point) {
    let e = this.getOn(GEventKeys.ON_UP);
    for (let callback of e) {
      callback(point);
    }
  }
  onUp(point) {
    this.pressed = false;
  }
  triggerOnDown(point) {
    let e = this.getOn(GEventKeys.ON_DOWN);
    for (let callback of e) {
      callback(point);
    }
  }
  onDown(point) {
    this.pressed = true;
  }
  triggerOnMove(point) {
    let e = this.getOn(GEventKeys.ON_MOVE);
    for (let callback of e) {
      callback(point);
    }
  }
  onMove(point) {
  }
  pushOnMove(...callbacks) {
    this.pushOn(GEventKeys.ON_MOVE, ...callbacks);
    return this;
  }
  removeOnMove(callback) {
    this.removeOn(GEventKeys.ON_MOVE, callback);
  }
  onParentMove(point) {
    if (this.inRange(point)) {
      this.triggerOnMove(point);
    }
    if (this.inRange(point) && this._pointerWasNotInRange) {
      this._pointerWasNotInRange = false;
      this.triggerOnEnter(point);
    }
    if (!this.inRange(point) && !this._pointerWasNotInRange) {
      this._pointerWasNotInRange = true;
      this.triggerOnLeave(point);
    }
  }
  pushOnParentMove(...callbacks) {
    this.pushOn(GEventKeys.ON_PARENT_MOVE, ...callbacks);
    return this;
  }
  triggerOnParentMove(point) {
    let e = this.getOn(GEventKeys.ON_PARENT_MOVE);
    for (let callback of e) {
      callback(point);
    }
  }
  inRange(point) {
    return point.x >= this.position.x && point.x <= this.position.x + this.absWidth && point.y >= this.position.y && point.y <= this.position.y + this.absHeight;
  }
  onEnter(point) {
    this.hovered = true;
  }
  triggerOnEnter(point) {
    let e = this.getOn(GEventKeys.ON_ENTER);
    for (let callback of e) {
      callback(point);
    }
  }
  pushOnParentDown(...callbacks) {
    this.pushOn(GEventKeys.ON_PARENT_DOWN, ...callbacks);
    return this;
  }
  triggerOnLeave(point) {
    let e = this.getOn(GEventKeys.ON_LEAVE);
    for (let callback of e) {
      callback(point);
    }
  }
  onLeave(point) {
    this.hovered = false;
  }
};

// src/Datatypes/PointerPoint.ts
var PointerPoint = class extends Point2D {
  constructor(x, y, pressure) {
    super(x, y);
    this.pressure = pressure;
  }
  static createFromPointerEvent(e) {
    return new PointerPoint(e.offsetX, e.offsetY, e.pressure);
  }
  toString() {
    return `(x:${this.x}, y:${this.y}, p:${this.pressure})`;
  }
  sub(other) {
    return new PointerPoint(this.x - other.x, this.y - other.y, this.pressure);
  }
};

// src/Cubism.ts
var Cubism = class {
  constructor(canvas) {
    this.root = new PointerHandleableElement();
    this.globalEvent = new CubismGlobalEventSystem();
    this.canvasDrawer = new CanvasDrawer(canvas, this.globalEvent);
    this.eventManger = new CubismEventManager(this.globalEvent);
    this.canvas = canvas;
    this.registerRedraw();
    this.registerPointerEvents();
  }
  registerPointerEvents() {
    this.canvas.onpointermove = (e) => {
      this.globalEvent.triggerGlobalEvent(GEventKeys.ON_MOVE, new PointerPoint(e.offsetX, e.offsetY, e.pressure));
    };
    this.globalEvent.registerGlobalEvent(GEventKeys.ON_MOVE, (point) => {
      this.root.triggerOnMove(point);
    });
    this.canvas.onpointerdown = (e) => {
      this.globalEvent.triggerGlobalEvent(GEventKeys.ON_DOWN, new PointerPoint(e.offsetX, e.offsetY, e.pressure));
    };
    this.globalEvent.registerGlobalEvent(GEventKeys.ON_DOWN, (point) => {
      this.root.triggerOnDown(point);
    });
    this.canvas.onpointerup = (e) => {
      this.globalEvent.triggerGlobalEvent(GEventKeys.ON_UP, new PointerPoint(e.offsetX, e.offsetY, e.pressure));
    };
    this.globalEvent.registerGlobalEvent(GEventKeys.ON_UP, (point) => {
      this.root.triggerOnUp(point);
    });
  }
  registerRedraw() {
    this.globalEvent.registerGlobalEvent(GEventKeys.REDRAW, this.redraw.bind(this));
  }
  registerOnMove() {
    this.globalEvent.registerGlobalEvent(GEventKeys.ON_MOVE, this.registerOnMove.bind(this));
  }
  static createFromCanvas(canvas) {
    return new Cubism(canvas);
  }
  static createFromId(id) {
    return Cubism.createFromCanvas(document.getElementById(id));
  }
  init(root) {
    this.setRootElement(root);
    this.initRootElement();
    this.canvasDrawer.setRedraw(true);
  }
  initRootElement() {
    this.root.init(
      this.canvasDrawer,
      new Point2D(this.canvas.width, this.canvas.height),
      this.globalEvent
    );
  }
  setRootElement(root) {
    this.root = root;
  }
  redraw() {
    this.canvasDrawer.clear();
    if (this.root) {
      this.root.render();
    }
  }
};

// src/Elements/Layouts/PointerHandleableLayout.ts
var PointerHandleableLayout = class extends PointerHandleableElement {
  constructor(...children) {
    super();
    this._children = [];
    this._children = children;
  }
  setGlobalEventSystem(globalEvent) {
    super.setGlobalEventSystem(globalEvent);
    for (let child of this.children) {
      child.setGlobalEventSystem(globalEvent);
    }
  }
  updateShape(x, y) {
    super.updateShape(x, y);
    this.updateChildrenShape();
  }
  updateChildrenShape() {
    this.updateChildrenSize();
    this.updateChildrenPosition();
  }
  updateChildrenSize() {
    for (let child of this.children) {
      let x = child.width;
      let y = child.height;
      if (x === LayoutValues.MATCH_PARENT) {
        x = this.absWidth;
      }
      if (y === LayoutValues.MATCH_PARENT) {
        y = this.absHeight;
        console.log("this.absHeight", this.absHeight);
      }
      child.updateShape(x, y);
    }
  }
  updateChildrenPosition() {
  }
  get children() {
    return this._children;
  }
  set children(children) {
    this._children = children;
  }
  pushChildren(...children) {
    this.children.push(...children);
    return this;
  }
  removeChild(child) {
    this.children.splice(this.children.indexOf(child), 1);
  }
  render() {
    var _a, _b;
    super.render();
    (_a = this.c) == null ? void 0 : _a.translate(this.position);
    for (let child of this.children) {
      child.render();
    }
    (_b = this.c) == null ? void 0 : _b.restoreTranslate();
  }
  setCanvasDrawer(c) {
    super.setCanvasDrawer(c);
    for (let child of this.children) {
      child.setCanvasDrawer(c);
    }
  }
  triggerOnMove(point) {
    super.triggerOnMove(point);
    let pointInChild = point.sub(this.position);
    for (let child of this.children) {
      child.triggerOnParentMove(pointInChild);
    }
  }
  triggerOnDown(point) {
    super.triggerOnDown(point);
    let pointInChild = new PointerPoint(point.x - this.position.x, point.y - this.position.y, point.pressure);
    for (let child of this.children) {
      child.triggerOnParentDown(pointInChild);
    }
  }
  triggerOnUp(point) {
    super.triggerOnUp(point);
    let pointInChild = point.sub(this.position);
    for (let child of this.children) {
      child.triggerOnParentUp(pointInChild);
    }
  }
};

// src/Elements/Layouts/LinearLayout.ts
var LinearLayout = class extends PointerHandleableLayout {
};

// src/Elements/Layouts/VerticalLayout.ts
var VerticalLayout = class extends LinearLayout {
  updateChildrenPosition() {
    super.updateChildrenPosition();
    let x = 0;
    let y = 0;
    for (let child of this.children) {
      child.position = new Point2D(x, y);
      y += child.height;
    }
  }
};

// src/Theme/Colors.ts
var Colors = class {
};
Colors.black = "#000000";
Colors.white = "#ffffff";
Colors.pureRed = "#ff0000";
Colors.pureGreen = "#00ff00";
Colors.pureBlue = "#0000ff";
Colors.pureYellow = "#ffff00";
Colors.pureCyan = "#00ffff";
Colors.pureMagenta = "#ff00ff";
Colors.orange = "#ff8000";
Colors.purple = "#8000ff";
Colors.pink = "#ff0080";
Colors.brown = "#804000";
Colors.grey100 = "#efefef";
Colors.grey200 = "#a0a0a0";
Colors.grey300 = "#808080";
Colors.grey400 = "#606060";
Colors.grey500 = "#404040";
Colors.grey600 = "#202020";
Colors.grey700 = "#000000";
Colors.blue100 = "#a6d5ff";
Colors.blue200 = "#7ec0ff";
Colors.blue300 = "#57abff";
Colors.blue400 = "#2e96ff";
Colors.blue500 = "#0080ff";
Colors.blue600 = "#0060cc";
Colors.blue700 = "#004099";
Colors.green100 = "#a6ffcc";
Colors.green200 = "#7effa6";
Colors.green300 = "#57ff80";
Colors.green400 = "#2eff5a";
Colors.green500 = "#00ff00";
Colors.green600 = "#00cc00";
Colors.green700 = "#009900";
Colors.red100 = "#ffcccc";
Colors.red200 = "#ff9999";
Colors.red300 = "#ff6666";
Colors.red400 = "#ff3333";
Colors.red500 = "#ff0000";
Colors.red600 = "#cc0000";
Colors.red700 = "#990000";
Colors.yellow100 = "#ffffcc";
Colors.yellow200 = "#ffff99";
Colors.yellow300 = "#ffff66";
Colors.yellow400 = "#ffff33";
Colors.yellow500 = "#ffff00";
Colors.yellow600 = "#cccc00";
Colors.yellow700 = "#999900";
Colors.cyan100 = "#ccffff";
Colors.cyan200 = "#99ffff";
Colors.cyan300 = "#66ffff";
Colors.cyan400 = "#33ffff";
Colors.cyan500 = "#00ffff";
Colors.cyan600 = "#00cccc";
Colors.cyan700 = "#009999";
Colors.magenta100 = "#ffccff";
Colors.magenta200 = "#ff99ff";
Colors.magenta300 = "#ff66ff";
Colors.magenta400 = "#ff33ff";
Colors.magenta500 = "#ff00ff";
Colors.magenta600 = "#cc00cc";
Colors.magenta700 = "#990099";
Colors.orange100 = "#ffcc99";
Colors.orange200 = "#ff9966";
Colors.orange300 = "#ff9933";
Colors.orange400 = "#ff9900";
Colors.orange500 = "#ff8000";
Colors.orange600 = "#cc6600";
Colors.orange700 = "#994c00";
Colors.purple100 = "#cc99ff";
Colors.purple200 = "#9966ff";
Colors.purple300 = "#9933ff";
Colors.purple400 = "#9900ff";
Colors.purple500 = "#8000ff";
Colors.purple600 = "#6600cc";
Colors.purple700 = "#4c0099";
Colors.pink100 = "#ff99cc";
Colors.pink200 = "#ff6699";
Colors.pink300 = "#ff3399";
Colors.pink400 = "#ff0099";
Colors.pink500 = "#ff0080";
Colors.pink600 = "#cc0066";
Colors.pink700 = "#99004c";
Colors.brown100 = "#cc9966";
Colors.brown200 = "#996633";
Colors.brown300 = "#994c00";
Colors.brown400 = "#993300";
Colors.brown500 = "#804000";
Colors.brown600 = "#663300";
Colors.brown700 = "#4c2600";
Colors.lightGray = "#c0c0c0";
Colors.darkGray = "#404040";
Colors.lightRed = "#ff8080";
Colors.lightGreen = "#80ff80";
Colors.lightBlue = "#8080ff";
Colors.lightYellow = "#ffff80";
Colors.lightCyan = "#80ffff";
Colors.lightMagenta = "#ff80ff";
Colors.darkRed = "#800000";
Colors.darkGreen = "#008000";
Colors.darkBlue = "#000080";
Colors.darkYellow = "#808000";
Colors.darkCyan = "#008080";
Colors.darkMagenta = "#800080";
Colors.transparent = "rgba(0,0,0,0)";
Colors.transparentBlack = "rgba(0,0,0,0.5)";
Colors.transparentWhite = "rgba(255,255,255,0.5)";
Colors.transparentRed = "rgba(255,0,0,0.5)";
Colors.transparentGreen = "rgba(0,255,0,0.5)";
Colors.transparentBlue = "rgba(0,0,255,0.5)";
Colors.transparentYellow = "rgba(255,255,0,0.5)";
Colors.transparentCyan = "rgba(0,255,255,0.5)";
Colors.transparentMagenta = "rgba(255,0,255,0.5)";
Colors.transparentOrange = "rgba(255,128,0,0.5)";
Colors.transparentPurple = "rgba(128,0,255,0.5)";
Colors.transparentPink = "rgba(255,0,128,0.5)";

// src/Theme/Theme.ts
var CubismElementThemeRoot = class {
  constructor(color = new ColorTheme(), font = new FontTheme()) {
    this.color = color;
    this.font = font;
  }
};
var ColorTheme = class {
  constructor() {
    this.primary = Colors.blue500;
    this.secondary = Colors.blue700;
    this.background = Colors.white;
    this.border = this.primary;
    this.text = Colors.black;
  }
  setPrimary(color) {
    this.primary = color;
    return this;
  }
  setSecondary(color) {
    this.secondary = color;
    return this;
  }
  setBackground(color) {
    this.background = color;
    return this;
  }
  setBorder(color) {
    this.border = color;
    return this;
  }
  setText(color) {
    this.text = color;
    return this;
  }
};
var OnClickColorTheme = class extends ColorTheme {
  constructor() {
    super(...arguments);
    this.background = Colors.grey200;
  }
};
var OnHoverColorTheme = class extends ColorTheme {
  constructor() {
    super(...arguments);
    this.background = Colors.grey100;
  }
};
var FontTheme = class {
  constructor() {
    this.fontSizes = 14;
    this.fontFamily = "Arial";
  }
  setFontSize(size) {
    this.fontSizes = size;
    return this;
  }
  setFontFamily(font) {
    this.fontFamily = font;
    return this;
  }
};

// src/Elements/ThemedElement.ts
var ThemedElement = class extends PointerHandleableElement {
  constructor() {
    super();
    this.defaultTheme = new CubismElementThemeRoot(
      new ColorTheme()
    );
    this.hoverTheme = new CubismElementThemeRoot(
      new OnHoverColorTheme()
    );
    this.pressedTheme = new CubismElementThemeRoot(
      new OnClickColorTheme()
    );
    this._currTheme = this.defaultTheme;
    this.currTheme = this.defaultTheme;
  }
  setFontTheme(theme) {
    this.defaultTheme.font = theme;
    this.hoverTheme.font = theme;
    this.pressedTheme.font = theme;
    return this;
  }
  get currTheme() {
    return this._currTheme;
  }
  set currTheme(theme) {
    this._currTheme = theme;
  }
  onMove(point) {
    var _a;
    super.onMove(point);
    (_a = this.c) == null ? void 0 : _a.setRedraw(true);
  }
  onDown(point) {
    var _a;
    super.onDown(point);
    (_a = this.c) == null ? void 0 : _a.setRedraw(true);
  }
  onUp(point) {
    var _a;
    super.onUp(point);
    (_a = this.c) == null ? void 0 : _a.setRedraw(true);
  }
  onEnter(point) {
    var _a;
    super.onEnter(point);
    (_a = this.c) == null ? void 0 : _a.setRedraw(true);
  }
  onLeave(point) {
    var _a;
    super.onLeave(point);
    (_a = this.c) == null ? void 0 : _a.setRedraw(true);
  }
  setDefaultTheme(theme) {
    this.defaultTheme = theme;
    return this;
  }
  setHoverTheme(theme) {
    this.hoverTheme = theme;
    return this;
  }
  setPressTheme(theme) {
    this.pressedTheme = theme;
    return this;
  }
  render() {
    super.render();
    let c = this.c;
    c.translate(this.position);
    this.currTheme = this.defaultTheme;
    if (this.hovered) {
      this.currTheme = this.hoverTheme;
    }
    if (this.pressed) {
      this.currTheme = this.pressedTheme;
    }
    c.setFillStyle(this.currTheme.color.background);
    c.setStrokeStyle(this.currTheme.color.border);
    c.drawRectWithPoints(this.absSize);
    c.restoreTranslate();
  }
};

// src/Elements/ButtonElement.ts
var ButtonElement = class extends ThemedElement {
  constructor(text = "Button") {
    super();
    this.text = text;
    this.setFontTheme(new FontTheme().setFontSize(30));
  }
  setText(text) {
    this.text = text;
    return this;
  }
  render() {
    super.render();
    let c = this.c;
    c.setFillStyle(this.currTheme.color.text);
    c.fillText(this.text, 10, 30);
  }
};

// src/Elements/DraggableRect.ts
var DraggableRect = class extends ThemedElement {
  constructor() {
    super(...arguments);
    this.pointerRelativePosition = null;
  }
  onDown(point) {
    super.onDown(point);
    this.pointerRelativePosition = new Point2D(point.x - this.position.x, point.y - this.position.y);
  }
  onParentMove(point) {
    var _a;
    super.onParentMove(point);
    if (this.pointerRelativePosition !== null) {
      this.position = point.sub(this.pointerRelativePosition);
      (_a = this.c) == null ? void 0 : _a.triggerRedraw();
    }
  }
  onUp(point) {
    super.onUp(point);
    this.pointerRelativePosition = null;
  }
};

// src/Elements/Layouts/HorizontalLayout.ts
var HorizontalLayout = class extends LinearLayout {
  updateChildrenPosition() {
    super.updateChildrenPosition();
    let x = 0;
    let y = 0;
    for (let child of this.children) {
      child.position = new Point2D(x, y);
      x += child.width;
    }
  }
};

// src/CubismBuilder.ts
var CubismBuilder = class {
  toString() {
    return "CubismBuilder";
  }
  get cubism() {
    return Cubism;
  }
  get c() {
    return this.cubism;
  }
  verticalLayout(...children) {
    return new VerticalLayout(...children);
  }
  horizontalLayout(...children) {
    return new HorizontalLayout(...children);
  }
  h(...children) {
    return this.horizontalLayout(...children);
  }
  v(...children) {
    return this.verticalLayout(...children);
  }
  get colorTheme() {
    return new ColorTheme();
  }
  colors() {
    return Colors;
  }
  get button() {
    return new ButtonElement();
  }
  buttonWithText(text) {
    return new ButtonElement(text);
  }
  get draggableRect() {
    return new DraggableRect();
  }
};

// src/Index.ts
console.log("loading Index.ts");
console.log();
var LiveDemo = class {
  constructor() {
    this.environmentName = "b";
    this.codeText = document.getElementById("codeText");
    this.codeText.value = this.initFunctionToString();
    this.builder = new CubismBuilder();
    this.userFunction = this.getUserFunction();
  }
  main() {
    let updateButton = document.getElementById("update");
    updateButton.onclick = this.updateCubism.bind(this);
    this.updateCubism();
  }
  updateCubism() {
    console.log("update");
    this.updateUserFunction();
    this.runUserFunction();
  }
  initFunctionToString() {
    let s = defaultInitCode.toString();
    s = s.substring(s.indexOf("{") + 1, s.lastIndexOf("}"));
    s = s.replace(/  /g, "");
    return s;
  }
  getUserFunction() {
    let code = this.codeText.value;
    return new Function(this.environmentName, code);
  }
  updateUserFunction() {
    this.userFunction = this.getUserFunction();
  }
  runUserFunction() {
    this.userFunction(this.builder);
  }
};
function defaultInitCode(b) {
  console.log(`Builder is ${b}`);
  b.c.createFromId("mainCanvas").init(
    b.v(
      b.draggableRect.setWidth(100).setHeight(100),
      b.draggableRect.setWidth(100).setHeight(100),
      b.button.setText("Button").setHeight(50).setWidth(100)
    )
  );
}
new LiveDemo().main();
//# sourceMappingURL=build.js.map
