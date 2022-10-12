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
  static translationFromPoint(point) {
    return TransformMatrix2D.translation(point.x, point.y);
  }
  static rotation(angle) {
    let cos = Math.cos(angle);
    let sin = Math.sin(angle);
    return new TransformMatrix2D(cos, -sin, sin, cos, 0, 0);
  }
  static scale(x, y) {
    return new TransformMatrix2D(x, 0, 0, y, 0, 0);
  }
  static scaleFromPoint(point) {
    return TransformMatrix2D.scale(point.x, point.y);
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
var EventKeys = class {
};
EventKeys.ON_MOVE = "onMove";
EventKeys.ON_DOWN = "onDown";
EventKeys.ON_UP = "onUp";
EventKeys.GLOBAL_ON_POINTER_CHANGE = "redraw";
EventKeys.FPS_UPDATE = "FPS_EVENT";
EventKeys.ON_POINTER_EVENT = "onPointerEvent";
EventKeys.ON_CLICK = "onClick";
EventKeys.ON_DOUBLE_CLICK = "onDoubleClick";
EventKeys.ON_DRAG = "onDrag";
EventKeys.ON_DRAG_START = "onDragStart";
EventKeys.ON_DRAG_END = "onDragEnd";
EventKeys.ON_DRAG_ENTER = "onDragEnter";
EventKeys.ON_DRAG_LEAVE = "onDragLeave";
EventKeys.ON_DRAG_OVER = "onDragOver";
EventKeys.ON_DROP = "onDrop";
EventKeys.ON_PARENT_MOVE = "onParentMove";
EventKeys.ON_PARENT_DOWN = "onParentDown";
EventKeys.ON_PARENT_UP = "onParentUp";
EventKeys.ON_PARENT_CLICK = "onParentClick";
EventKeys.ON_ENTER = "onEnter";
EventKeys.ON_LEAVE = "onLeave";
EventKeys.FRAME_UPDATE = "onFrameUpdate";
EventKeys.FIX_UPDATE = "onFixUpdate";
EventKeys.REDRAW = "onRedraw";
EventKeys.POINTER_DOWN = "onMouseDown";
EventKeys.POINTER_UP = "onMouseUp";
EventKeys.POINTER_MOVE = "onMouseMove";

// src/CubismPart.ts
var CubismPart = class {
  constructor() {
    this._cubism = null;
  }
  get cubism() {
    return this.getCubism();
  }
  set cubism(cubism) {
    this.setCubism(cubism);
  }
  setCubism(cubism) {
    this._cubism = cubism;
  }
  getCubism() {
    if (this._cubism === null) {
      throw new Error(`Cubism is not set for ${this.className}`);
    }
    return this._cubism;
  }
  get className() {
    return this.constructor.name;
  }
  toString() {
    return `${this.className}(${this._cubism === null ? this._cubism : "NO CUBISM"})`;
  }
};

// src/CanvasDrawer.ts
var CanvasDrawer = class extends CubismPart {
  constructor(canvas) {
    super();
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.state = new CubismCanvasState(canvas, this.ctx);
  }
  get eventSystem() {
    return this.cubism.eventSystem;
  }
  setCubism(cubism) {
    super.setCubism(cubism);
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
    this.eventSystem.registerEvent(EventKeys.FRAME_UPDATE, this.frameUpdate.bind(this));
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
    this.eventSystem.triggerEvent(EventKeys.REDRAW);
  }
};

// src/Global/Inter/CubismEventSystem.ts
var CubismEventSystem = class extends CubismPart {
  constructor() {
    super(...arguments);
    this._globalEventListeners = {};
  }
  getEvent(event) {
    if (this._globalEventListeners[event] === void 0) {
      this._globalEventListeners[event] = [];
      this._globalEventListeners[event].push(() => {
      });
    }
    return this._globalEventListeners[event];
  }
  registerEvent(eventKey, callback) {
    this.getEvent(eventKey).push(callback);
  }
  triggerEvent(eventKey, ...args) {
    this.getEvent(eventKey).forEach((callback) => {
      callback(...args);
    });
  }
  unregisterEvent(eventKey, callback) {
    this._globalEventListeners[eventKey].splice(this._globalEventListeners[eventKey].indexOf(callback), 1);
  }
  removeAllEvents() {
    this._globalEventListeners = {};
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
  subXY(x, y) {
    return this.sub(new Point2D(x, y));
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

// src/Global/Outer/CubismOuterGlobal.ts
var CubismOuterGlobal = class {
  constructor() {
    this._cubismInstances = {};
  }
  static get instance() {
    if (!CubismOuterGlobal._instance) {
      CubismOuterGlobal._instance = new CubismOuterGlobal();
    }
    return CubismOuterGlobal._instance;
  }
  static getCubismInstance(key) {
    return CubismOuterGlobal.instance._cubismInstances[key];
  }
  static registerCubismInstance(key, app) {
    if (CubismOuterGlobal.instance._cubismInstances[key] === void 0) {
      CubismOuterGlobal.instance._cubismInstances[key] = app;
    } else {
      console.log("Replacing cubism instance with key " + key);
      CubismOuterGlobal.instance._cubismInstances[key] = app;
    }
  }
};

// src/CubismInitializer.ts
var CubismInitializer = class extends CubismPart {
  constructor() {
    super(...arguments);
    this.fps = 0;
  }
  get eventSystem() {
    return this.cubism.eventSystem;
  }
  initializeFixedUpdate(timeInterval = 1e3 / 60) {
    setInterval(this.doFixUpdate.bind(this), timeInterval);
    return this;
  }
  doFixUpdate() {
    this.eventSystem.triggerEvent(EventKeys.FIX_UPDATE);
  }
  initializeFrameUpdate() {
    this.eventSystem.triggerEvent(EventKeys.FRAME_UPDATE);
    window.requestAnimationFrame(this.doFrameUpdate.bind(this));
    return this;
  }
  initializeFPSCounter() {
    this.eventSystem.registerEvent(EventKeys.FPS_UPDATE, this.doFPSUpdate.bind(this));
    setInterval(this.triggerFPSUpdate.bind(this), 1e3);
    this.eventSystem.registerEvent(EventKeys.FRAME_UPDATE, this.incrementFPS.bind(this));
    return this;
  }
  triggerFPSUpdate() {
    this.eventSystem.triggerEvent(EventKeys.FPS_UPDATE, this.fps);
    this.resetFPSCounter();
  }
  doFPSUpdate(fps) {
  }
  resetFPSCounter() {
    this.fps = 0;
  }
  incrementFPS() {
    this.fps++;
  }
  getFPS() {
    return this.fps;
  }
  doFrameUpdate() {
    this.eventSystem.triggerEvent(EventKeys.FRAME_UPDATE);
    window.requestAnimationFrame(this.doFrameUpdate.bind(this));
  }
  initializeAlwaysRedraw() {
    this.eventSystem.registerEvent(EventKeys.FRAME_UPDATE, this.triggerRedraw.bind(this));
    return this;
  }
  triggerRedraw() {
    this.eventSystem.triggerEvent(EventKeys.REDRAW);
  }
};

// src/CubismElementManger.ts
var CubismElementManger = class {
  constructor() {
    this._elementsWithId = {};
    this._elementsWithClass = {};
  }
  registerElementId(id, element) {
    console.log("registering element with id " + id);
    if (this._elementsWithId[id] === void 0) {
      this._elementsWithId[id] = element;
    } else {
      throw new Error("Element with that id already exists");
    }
  }
  getElementById(id) {
    return this._elementsWithId[id];
  }
  removeElementWithId(id) {
    delete this._elementsWithId[id];
  }
  registerElementClass(className, element) {
    if (this._elementsWithClass[className] === void 0) {
      this._elementsWithClass[className] = [];
    }
    this._elementsWithClass[className].push(element);
  }
  getElementsByClass(className) {
    return this._elementsWithClass[className];
  }
  removeElementWithClass(className, element) {
    this._elementsWithClass[className].splice(this._elementsWithClass[className].indexOf(element), 1);
  }
  removeClass(className) {
    delete this._elementsWithClass[className];
  }
};

// src/Cubism.ts
var Cubism = class extends CubismElementManger {
  constructor(canvas) {
    super();
    this._root = null;
    this.canvas = canvas;
    this.eventSystem = new CubismEventSystem();
    this.canvasDrawer = new CanvasDrawer(canvas);
    this._initializer = new CubismInitializer();
    this.initParts(this.canvasDrawer, this.eventSystem, this.initializer);
    this.registerRedraw();
    this.registerGlobalPointerEvents();
    if (canvas.id === null || canvas.id === void 0 || canvas.id === "") {
      throw new Error("Canvas must have an id");
    }
    this.cubismId = canvas.id;
    CubismOuterGlobal.registerCubismInstance(this.cubismId, this);
  }
  get initializer() {
    return this._initializer;
  }
  get rootElement() {
    if (this._root === null) {
      throw new Error("Root is not set");
    }
    return this._root;
  }
  set rootElement(root) {
    this.initParts(root);
    this._root = root;
  }
  registerGlobalPointerEvents() {
    this.canvas.onpointermove = (e) => {
      this.eventSystem.triggerEvent(EventKeys.ON_POINTER_EVENT, new PointerPoint(e.offsetX, e.offsetY, e.pressure));
    };
    this.canvas.onpointerdown = (e) => {
      this.eventSystem.triggerEvent(EventKeys.ON_POINTER_EVENT, new PointerPoint(e.offsetX, e.offsetY, e.pressure));
    };
    this.canvas.onpointerup = (e) => {
      this.eventSystem.triggerEvent(EventKeys.ON_POINTER_EVENT, new PointerPoint(e.offsetX, e.offsetY, e.pressure));
    };
  }
  registerRootElementPointerEvents() {
    this.eventSystem.registerEvent(EventKeys.ON_POINTER_EVENT, (point) => {
      this.rootElement.triggerEvent(EventKeys.ON_POINTER_EVENT, point);
    });
  }
  registerRedraw() {
    this.eventSystem.registerEvent(EventKeys.REDRAW, this.redraw.bind(this));
  }
  static createFromCanvas(canvas) {
    return new Cubism(canvas);
  }
  static createFromId(id) {
    return Cubism.createFromCanvas(document.getElementById(id));
  }
  init(root) {
    this.rootElement = root;
    this.initRootElement();
    this.initializer.initializeFrameUpdate().initializeFPSCounter().initializeAlwaysRedraw();
    this.registerRootElementPointerEvents();
    this.canvasDrawer.setRedraw(true);
  }
  initRootElement() {
    console.log("init root element");
    this.rootElement.resize(
      new Point2D(this.canvas.width, this.canvas.height)
    );
  }
  redraw() {
    this.canvasDrawer.clear();
    if (this.rootElement) {
      this.rootElement.draw();
    }
  }
  initParts(...parts) {
    parts.forEach(
      (part) => {
        part.cubism = this;
        console.log(`Initializing cubism part [${part}]`);
      }
    );
  }
  toString() {
    return `Cubism [${this.cubismId}]`;
  }
};

// src/Debug/Console.ts
function initConsole() {
  let w = window;
  w.test = () => {
    console.log("test");
  };
  w.cubismGlobal = CubismOuterGlobal.instance;
}

// src/Elements/CubismElement.ts
var CubismElement = class extends CubismEventSystem {
  constructor(elementId = null) {
    super();
    this.elementId = null;
    this.needsResize = true;
    this._position = new Point2D(0, 0);
    this._size = new Point2D(LayoutValues.MATCH_PARENT, LayoutValues.MATCH_PARENT);
    this._absSize = new Point2D(0, 0);
    this.elementId = elementId;
  }
  setId(id) {
    this.elementId = id;
    if (this.cubism) {
      this.cubism.registerElementId(id, this);
    }
    return this;
  }
  setCubism(cubism) {
    super.setCubism(cubism);
    if (this.elementId !== null) {
      this.setId(this.elementId);
    }
  }
  set position(pos) {
    this._position = pos;
    this.c.setRedraw(true);
  }
  get position() {
    return this._position;
  }
  get size() {
    return this._size;
  }
  set size(size) {
    this.setSizeFromXY(size.x, size.y);
  }
  setSizeFromXY(x, y) {
    this.size.x = x;
    this.size.y = y;
    this.needsResize = true;
    return this;
  }
  get absSize() {
    return this._absSize;
  }
  set absSize(size) {
    this._absSize = size;
    this.c.setRedraw(true);
  }
  get height() {
    return this.size.y;
  }
  set height(y) {
    this.setSizeFromXY(this.width, y);
  }
  get width() {
    return this.size.x;
  }
  set width(x) {
    this.setSizeFromXY(x, this.height);
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
  setWidth(width) {
    this.width = width;
    this.needsResize = true;
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
  resize(targetSize) {
    this.resizeFromXY(targetSize.x, targetSize.y);
  }
  resizeFromXY(x, y) {
    this.absWidth = x;
    this.absHeight = y;
    this.needsResize = false;
  }
  get c() {
    if (!this.cubism) {
      console.log(this.cubism);
      throw new Error(`Cubism instance not set for ${this}`);
    }
    return this.cubism.canvasDrawer;
  }
  draw() {
  }
  toString() {
    return `[${this.elementId ? this.elementId : "NO ID"}]: ${this.className} abs(${this.absWidth}x${this.absHeight}) rel(${this.width}x${this.height})`;
  }
};

// src/Elements/CubismParentElement.ts
var CubismParentElement = class extends CubismElement {
  constructor(elementId = null, ...children) {
    super(elementId);
    this.children = [];
    this.addChildren(...children);
  }
  resize(targetSize) {
    super.resize(targetSize);
    this.updateChildrenShape();
  }
  updateChildrenShape() {
    this.updateChildrenSize();
    this.updateChildrenPosition();
  }
  updateChildrenPosition() {
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
      child.resize(new Point2D(x, y));
    }
  }
  addChildren(...children) {
    for (let child of children) {
      this.children.push(child);
      if (this._cubism) {
        child.setCubism(this.cubism);
      }
    }
    return this;
  }
  removeChild(child) {
    let index = this.children.indexOf(child);
    if (index > -1) {
      this.children.splice(index, 1);
    }
  }
  removeChildren(children) {
    for (let child of children) {
      this.removeChild(child);
    }
  }
  draw() {
    super.draw();
    this.drawChildren();
  }
  drawChildren() {
    this.c.translate(this.position);
    for (let child of this.children) {
      child.draw();
    }
    this.c.restoreTranslate();
  }
  setCubism(cubism) {
    super.setCubism(cubism);
    this.setChildrenCubism(cubism);
  }
  setChildrenCubism(cubism) {
    for (let child of this.children) {
      child.setCubism(cubism);
    }
  }
};

// src/Elements/PointerHanderParentElement.ts
var PointerHandlerParentElement = class extends CubismParentElement {
  constructor(id = null, ...children) {
    super(id, ...children);
    this._dragPoint = null;
    this._pointerWasInRange = false;
    this._hovered = false;
    this._pressed = false;
    this.registerEvent(EventKeys.ON_POINTER_EVENT, this.onPointerEvent.bind(this));
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
  onDown(point) {
  }
  onUp(point) {
  }
  onLeave(point) {
  }
  onEnter(point) {
  }
  onMove(point) {
  }
  onParentMove(point) {
  }
  onPointerEvent(point) {
    this.triggerThisPointerEvent(point);
    this.triggerChildrenPointerEvent(point.sub(this.position));
  }
  triggerThisPointerEvent(point) {
    if (this.pointerInRange(point)) {
      if (!this._pointerWasInRange) {
        this.onEnter(point);
      }
      this._pointerWasInRange = true;
      this.onMove(point);
      if (point.pressure !== 0 && !this._pressed) {
        this.onDown(point);
        this._dragPoint = point;
        this._pressed = true;
      }
      if (point.pressure === 0 && this._pressed) {
        this.onUp(point);
        this._dragPoint = null;
        this._pressed = false;
      }
    } else {
      if (this._pointerWasInRange) {
        this.onLeave(point);
        this._pointerWasInRange = false;
      }
    }
    this.onParentMove(point);
  }
  triggerChildrenPointerEvent(point) {
    if (this.pointerInRange(point)) {
      for (let child of this.children) {
        child.triggerEvent(EventKeys.ON_POINTER_EVENT, point);
      }
    }
  }
  pointerInRange(point) {
    if (point.x >= this.position.x && point.x <= this.absWidth + this.position.x) {
      if (point.y >= this.position.y && point.y <= this.absHeight + this.position.y) {
        return true;
      }
    }
    return false;
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

// src/Elements/Fancy/RecursiveRect.ts
var RecursiveRect = class extends PointerHandlerParentElement {
  constructor(recursionCount = 10, width = 200, height = 200) {
    super();
    this.lastPoint = null;
    this.width = width;
    this.height = height;
    this.recursionCount = recursionCount;
  }
  draw() {
    this.c.translate(
      this.position
    );
    this.c.setFillStyle(Colors.green100);
    this.c.setStrokeWidth(2);
    this.c.setStrokeStyle(Colors.green700);
    let relaPos = this.position.subXY(100, 100);
    let relaSpeed = 0.2;
    let relaSize = 10;
    this.c.drawRect(0, 0, this.width, this.height);
    let pos = new Point2D(0, 0);
    for (let i = 1; i < this.recursionCount + 1; i++) {
      let relaSpeedI = relaSpeed * i;
      let relaSizeI = relaSize * i;
      this.c.translate(relaPos.scale(relaSpeedI));
      this.c.drawRect(relaSizeI, relaSizeI, this.width - relaSizeI, this.height - relaSizeI);
      this.c.restoreTranslate();
    }
    this.c.restoreTranslate();
  }
  onMove(point) {
    if (point.pressure > 0) {
      if (!this.lastPoint) {
        this.lastPoint = point.sub(this.position);
      }
      this.position = point.sub(this.lastPoint);
    } else {
      this.lastPoint = null;
    }
  }
  triggerChildrenPointerEvent(point) {
  }
};

// src/Elements/Fancy/ChangingRainbowBackground.ts
var ChangingRainbowBackground = class extends CubismElement {
  constructor() {
    super();
    this.frameCount = 0;
    this.saturation = 70;
    this.lightness = 90;
  }
  setSaturation(s) {
    if (s > 100) {
      s = 100;
    }
    this.saturation = s;
    return this;
  }
  setLightness(l) {
    if (l > 100) {
      l = 100;
    }
    this.lightness = l;
    return this;
  }
  draw() {
    this.frameCount++;
    this.c.translate(this.position);
    let currHue = this.frameCount % 360;
    let currColor = `hsl(${currHue}, ${this.saturation}%, ${this.lightness}%)`;
    this.c.setFillStyle(currColor);
    this.c.setStrokeWidth(0);
    this.c.setStrokeStyle(currColor);
    this.c.drawRect(0, 0, this.absWidth, this.absHeight);
    this.c.restoreTranslate();
  }
};

// src/Index.ts
console.log("loading Index.ts");
var LiveDemo = class {
  constructor() {
    this.codeText = document.getElementById("codeText");
    this.codeText.value = this.getFormattedFunctionString();
    this.userFunction = this.getUserFunction();
  }
  userFunction() {
  }
  main() {
    initConsole();
    let updateButton = document.getElementById("update");
    updateButton.onclick = this.updateCubism.bind(this);
    this.updateCubism();
  }
  updateCubism() {
    console.log("update");
    this.updateUserFunction();
    this.runUserFunction();
  }
  getFormattedFunctionString() {
    let s = defaultInitCode.toString();
    s = s.substring(s.indexOf("{") + 1, s.lastIndexOf("}"));
    s = s.replace(/^ {2}/gm, "");
    return s;
  }
  getUserFunction() {
    let code = this.codeText.value;
    return new Function(code);
  }
  updateUserFunction() {
    this.userFunction = this.getUserFunction();
  }
  runUserFunction() {
    this.userFunction();
  }
};
function defaultInitCode() {
  let app = Cubism.createFromId("mainCanvas");
  app.init(
    new PointerHandlerParentElement(
      null,
      new ChangingRainbowBackground().setSizeFromXY(LayoutValues.MATCH_PARENT, LayoutValues.MATCH_PARENT).setLightness(70).setSaturation(80),
      new RecursiveRect(10, 200, 200).setPosFromXY(100, 100)
    )
  );
  app.eventSystem.registerEvent(EventKeys.FPS_UPDATE, (fps) => {
    let fpsCounter = document.getElementById("fpsCounter");
    fpsCounter.innerText = `FPS: ${fps}`;
  });
}
new LiveDemo().main();
//# sourceMappingURL=es-build.js.map
