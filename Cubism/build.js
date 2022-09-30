"use strict";
(() => {
  // src/Datatypes/Two2DTransform.ts
  var TwoDTransformMatrix = class {
    constructor(m11, m12, m21, m22, dx, dy) {
      this.m11 = m11;
      this.m12 = m12;
      this.m21 = m21;
      this.m22 = m22;
      this.dx = dx;
      this.dy = dy;
      this.arr = [];
      this.arr = [
        [m11, m12, dx],
        [m21, m22, dy],
        [0, 0, 1]
      ];
    }
    static makeFromArray(arr) {
      return new TwoDTransformMatrix(arr[0][0], arr[0][1], arr[1][0], arr[1][1], arr[0][2], arr[1][2]);
    }
    get(x, y) {
      return this.arr[x][y];
    }
    set(x, y, value) {
      console.log(`Setting ${x}, ${y} to ${value}`);
      this.arr[x][y] = value;
    }
    static identity() {
      return new TwoDTransformMatrix(1, 0, 0, 1, 0, 0);
    }
    static zero() {
      return new TwoDTransformMatrix(0, 0, 0, 0, 0, 0);
    }
    static translation(x, y) {
      return new TwoDTransformMatrix(1, 0, 0, 1, x, y);
    }
    static rotation(angle) {
      let cos = Math.cos(angle);
      let sin = Math.sin(angle);
      return new TwoDTransformMatrix(cos, -sin, sin, cos, 0, 0);
    }
    static scale(x, y) {
      return new TwoDTransformMatrix(x, 0, 0, y, 0, 0);
    }
    clone() {
      return new TwoDTransformMatrix(this.m11, this.m12, this.m21, this.m22, this.dx, this.dy);
    }
    multiply(other) {
      console.log(`Multiplying
${this.toString()}
 with
${other.toString()}`);
      let test = [];
      for (let i = 0; i < 3; i++) {
        test.push([]);
      }
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          let dotProduct = 0;
          for (let k = 0; k < 3; k++) {
            dotProduct += this.get(i, k) * other.get(k, j);
          }
          test[i].push(dotProduct);
        }
      }
      console.log(`Result:
${test[0]}
${test[1]}
${test[2]}`);
      let newMatrix = TwoDTransformMatrix.makeFromArray(test);
      console.log(`Result:
${newMatrix.toString()}`);
      return newMatrix;
    }
    translate(x, y) {
      return this.multiply(TwoDTransformMatrix.translation(x, y));
    }
    rotate(angle) {
      return this.multiply(TwoDTransformMatrix.rotation(angle));
    }
    scale(x, y) {
      return this.multiply(TwoDTransformMatrix.scale(x, y));
    }
    static nMultiply(a, others) {
      return a.clone().multiply(others);
    }
    toString() {
      return `(${this.m11}, ${this.m12}, ${this.dx})
(${this.m21}, ${this.m22}, ${this.dy})`;
    }
  };

  // src/State.ts
  var CubismCanvasState = class {
    constructor(canvas, ctx) {
      this.lineWidths = [10];
      this.fillStyles = ["gray"];
      this.translates = [TwoDTransformMatrix.identity()];
      this._needsRedraw = true;
      this.canvas = canvas;
      this.ctx = ctx;
    }
    set lineWidth(lineWidth) {
      this.lineWidths.push(lineWidth);
    }
    get lineWidth() {
      return this.lineWidths[this.lineWidths.length - 1];
    }
    popLineWidth() {
      if (this.lineWidths.length > 1) {
        this.lineWidths.pop();
      }
      return this.lineWidth;
    }
    set fillStyle(style) {
      this.fillStyles.push(style);
    }
    get fillStyle() {
      return this.fillStyles[this.fillStyles.length - 1];
    }
    set translate(offset) {
      console.log("set translate", offset.x, offset.y);
      let newTranslate = TwoDTransformMatrix.translation(offset.x, offset.y);
      let translateMatrix = this.translateMatrix.clone().multiply(newTranslate);
      this.translates.push(translateMatrix);
      console.log("translate matrix: \n" + translateMatrix);
      this.setCtxTransform(translateMatrix);
    }
    setCtxTransform(t) {
      this.ctx.setTransform(t.m11, t.m12, t.m21, t.m22, t.dx, t.dy);
    }
    restoreTranslate() {
      let lastTranslate = this.popTranslate();
      console.log("restore translate", lastTranslate);
      this.setCtxTransform(lastTranslate);
    }
    get translateMatrix() {
      return this.translates[this.translates.length - 1];
    }
    popTranslate() {
      if (this.translates.length > 1) {
        console.log("pop translate");
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
  var Values = class {
  };
  Values.FRAME_UPDATE = "onFrameUpdate";
  Values.FIX_UPDATE = "onFixUpdate";
  Values.REDRAW = "onRedraw";
  Values.ON_MOVE = "onMove";
  Values.ON_DOWN = "onDown";
  Values.ON_UP = "onUp";
  Values.ON_CLICK = "onClick";
  Values.ON_DOUBLE_CLICK = "onDoubleClick";
  Values.ON_DRAG = "onDrag";
  Values.ON_DRAG_START = "onDragStart";
  Values.ON_DRAG_END = "onDragEnd";
  Values.ON_DRAG_ENTER = "onDragEnter";
  Values.ON_DRAG_LEAVE = "onDragLeave";
  Values.ON_DRAG_OVER = "onDragOver";
  Values.ON_DROP = "onDrop";
  Values.ON_PARENT_MOVE = "onParentMove";
  Values.ON_PARENT_DOWN = "onParentDown";
  Values.ON_PARENT_UP = "onParentUp";
  Values.ON_PARENT_CLICK = "onParentClick";
  Values.POINTER_DOWN = "onMouseDown";
  Values.POINTER_UP = "onMouseUp";
  Values.POINTER_MOVE = "onMouseMove";
  var LayoutValues = class {
  };
  LayoutValues.DEFAULT_PADDING = 10;
  LayoutValues.DEFAULT_MARGIN = 10;
  LayoutValues.DEFAULT_BORDER = 1;
  LayoutValues.MATCH_PARENT = -1;

  // src/CanvasDrawer.ts
  var CanvasDrawer = class {
    constructor(canvas, globalEvent) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.state = new CubismCanvasState(canvas, this.ctx);
      this.globalEvent = globalEvent;
      this.registerFrameUpdate();
    }
    registerFrameUpdate() {
      this.globalEvent.registerGlobalEvent(Values.FRAME_UPDATE, this.frameUpdate.bind(this));
    }
    frameUpdate() {
      if (this.state.needsRedraw) {
        console.log("this.state.needsRedraw: Redraw");
        this.globalEvent.triggerGlobalEvent(Values.REDRAW);
        this.state.needsRedraw = false;
      }
    }
    clear() {
      this.canvas.width = this.canvas.width;
    }
    setFillStyle(color) {
      this.ctx.fillStyle = color;
      this.state.fillStyle = color;
    }
    translate(offset) {
      this.state.translate = offset;
    }
    restoreTranslate() {
      this.state.restoreTranslate();
    }
    drawText(text, x, y) {
      this.ctx.fillText(text, x, y);
    }
    setStrokeStyle(color) {
      this.ctx.strokeStyle = color;
    }
    setStrokeWidth(width) {
      this.ctx.lineWidth = width;
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
      this.ctx.lineWidth = this.state.lineWidth;
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
      this.globalEvent.triggerGlobalEvent(Values.REDRAW);
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
      this.globalEvent.triggerGlobalEvent(Values.FIX_UPDATE);
    }
    startFrameUpdate() {
      this.globalEvent.triggerGlobalEvent(Values.FRAME_UPDATE);
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
    sub(other) {
      return new Point2D(this.x - other.x, this.y - other.y);
    }
    offset(offset) {
      this.x += offset.x;
      this.y += offset.y;
    }
    nOffset(offset) {
      this.x -= offset.x;
      this.y -= offset.y;
    }
    add(other) {
      return new Point2D(this.x + other.x, this.y + other.y);
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

  // src/Debug/Log.ts
  var _Log = class {
    static log(message, ...args) {
      let s = message;
      if (args.length !== 0) {
        s += ": ";
      }
      s += "\n";
      for (let i = 0; i < args.length; i++) {
        s += args[i] + "\n";
      }
      console.log(s);
    }
    static logDebug(message, ...args) {
      if (_Log.debugFlag) {
        _Log.log(message, ...args);
      }
    }
  };
  var Log = _Log;
  Log.debugFlag = true;

  // src/UI/Elements/CubismElement.ts
  var CubismElement = class {
    constructor() {
      this.globalEvent = null;
      this._position = new Point2D(0, 0);
      this._size = new Point2D(0, 0);
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
      this.resize(parentSize.x, parentSize.y);
      this.setGlobalEventSystem(globalEvent);
    }
    setGlobalEventSystem(globalEvent) {
      this.globalEvent = globalEvent;
    }
    resize(x, y) {
      Log.logDebug("Resizing", this, "to", x, y);
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
      Log.logDebug("Rendering", this);
    }
    toString() {
      return `${this.elementName} abs(${this.absWidth}x${this.absHeight}) rel(${this.width}x${this.height})`;
    }
    get elementName() {
      return this.constructor.name;
    }
  };

  // src/UI/Elements/InteractiveElement.ts
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

  // src/UI/Elements/PointerHandleableElement.ts
  var PointerHandleableElement = class extends InteractiveElement {
    constructor() {
      super();
      this.pushOn(Values.ON_PARENT_MOVE, (point) => {
        this.onParentMove(point);
      });
      this.pushOn(Values.ON_MOVE, (point) => {
        this.onMove(point);
      });
      this.pushOn(Values.ON_PARENT_DOWN, (point) => {
        this.onParentDown(point);
      });
      this.pushOn(Values.ON_DOWN, (point) => {
        this.onDown(point);
      });
      this.pushOn(Values.ON_PARENT_UP, (point) => {
        this.onParentUp(point);
      });
      this.pushOn(Values.ON_UP, (point) => {
        this.onUp(point);
      });
    }
    triggerOnParentDown(point) {
      let e = this.getOn(Values.ON_PARENT_DOWN);
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
      let e = this.getOn(Values.ON_PARENT_UP);
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
      let e = this.getOn(Values.ON_UP);
      for (let callback of e) {
        callback(point);
      }
    }
    onUp(point) {
    }
    triggerOnDown(point) {
      let e = this.getOn(Values.ON_DOWN);
      for (let callback of e) {
        callback(point);
      }
    }
    onDown(point) {
    }
    triggerOnMove(point) {
      let e = this.getOn(Values.ON_MOVE);
      for (let callback of e) {
        callback(point);
      }
    }
    onMove(point) {
    }
    pushOnMove(...callbacks) {
      this.pushOn(Values.ON_MOVE, ...callbacks);
      return this;
    }
    removeOnMove(callback) {
      this.removeOn(Values.ON_MOVE, callback);
    }
    onParentMove(point) {
      if (this.inRange(point)) {
        this.triggerOnMove(point);
      }
    }
    pushOnParentMove(...callbacks) {
      this.pushOn(Values.ON_PARENT_MOVE, ...callbacks);
      return this;
    }
    triggerOnParentMove(point) {
      let e = this.getOn(Values.ON_PARENT_MOVE);
      for (let callback of e) {
        callback(point);
      }
    }
    inRange(point) {
      return point.x >= this.position.x && point.x <= this.position.x + this.absWidth && point.y >= this.position.y && point.y <= this.position.y + this.absHeight;
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
        this.globalEvent.triggerGlobalEvent(Values.ON_MOVE, new PointerPoint(e.offsetX, e.offsetY, e.pressure));
      };
      this.globalEvent.registerGlobalEvent(Values.ON_MOVE, (point) => {
        this.root.triggerOnMove(point);
      });
      this.canvas.onpointerdown = (e) => {
        this.globalEvent.triggerGlobalEvent(Values.ON_DOWN, new PointerPoint(e.offsetX, e.offsetY, e.pressure));
      };
      this.globalEvent.registerGlobalEvent(Values.ON_DOWN, (point) => {
        this.root.triggerOnDown(point);
      });
      this.canvas.onpointerup = (e) => {
        this.globalEvent.triggerGlobalEvent(Values.ON_UP, new PointerPoint(e.offsetX, e.offsetY, e.pressure));
      };
      this.globalEvent.registerGlobalEvent(Values.ON_UP, (point) => {
        this.root.triggerOnUp(point);
      });
    }
    registerRedraw() {
      this.globalEvent.registerGlobalEvent(Values.REDRAW, this.update.bind(this));
    }
    registerOnMove() {
      this.globalEvent.registerGlobalEvent(Values.ON_MOVE, this.registerOnMove.bind(this));
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
      this.canvasDrawer.state.needsRedraw = true;
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
    update() {
      this.canvasDrawer.clear();
      if (this.root) {
        this.root.render();
      }
    }
  };

  // src/UI/Elements/InteractiveRect.ts
  var InteractiveRect = class extends PointerHandleableElement {
    constructor() {
      super();
      this.background = "white";
      this.lineWidth = 10;
    }
    setLineWidth(width) {
      this.lineWidth = width;
      return this;
    }
    setBackgroundColor(color) {
      this.background = color;
      return this;
    }
    onMove(point) {
      super.onMove(point);
    }
    onDown(point) {
      super.onDown(point);
      Log.logDebug("down on", this);
    }
    toString() {
      return super.toString() + ` background:${this.background} lineWidth:${this.lineWidth}`;
    }
    render() {
      super.render();
      let c = this.c;
      c.setFillStyle(this.background);
      c.setStrokeStyle("black");
      c.setStrokeWidth(this.lineWidth);
      c.translate(this.position);
      c.drawRect(0, 0, this.absWidth, this.absHeight);
      c.restoreTranslate();
    }
  };

  // src/UI/Elements/Layouts/PointerHandleableLayout.ts
  var PointerHandleableLayout = class extends PointerHandleableElement {
    constructor(...children) {
      super();
      this._children = [];
      this._children = children;
      Log.logDebug("Children", this._children);
    }
    setGlobalEventSystem(globalEvent) {
      super.setGlobalEventSystem(globalEvent);
      for (let child of this.children) {
        child.setGlobalEventSystem(globalEvent);
      }
    }
    resize(x, y) {
      super.resize(x, y);
      Log.logDebug("absSize", this.absSize);
      for (let child of this.children) {
        let x2 = child.width;
        let y2 = child.height;
        if (x2 === LayoutValues.MATCH_PARENT) {
          Log.log("Match parent X", child);
          x2 = this.absWidth;
        }
        if (y2 === LayoutValues.MATCH_PARENT) {
          Log.log("Match parent Y", child);
          y2 = this.absHeight;
          console.log("this.absHeight", this.absHeight);
        }
        child.resize(x2, y2);
      }
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
      super.render();
      for (let child of this.children) {
        child.render();
      }
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

  // src/UI/Elements/DraggableRect.ts
  var DraggableRect = class extends InteractiveRect {
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
      Log.logDebug("up on", this);
      this.pointerRelativePosition = null;
    }
  };

  // src/Index.ts
  console.log("loading Index.ts");
  function main() {
    let canvas = document.getElementById("mainCanvas");
    let c = Cubism.createFromCanvas(canvas);
    c.init(
      new PointerHandleableLayout(
        new InteractiveRect().setWidth(LayoutValues.MATCH_PARENT).setHeight(LayoutValues.MATCH_PARENT).setBackgroundColor("red").setPosFromXY(0, 0),
        new DraggableRect().setWidth(100).setHeight(100).setBackgroundColor("blue").setPosFromXY(40, 40).setLineWidth(5),
        new DraggableRect().setWidth(100).setHeight(100).setBackgroundColor("green").setPosFromXY(80, 80).setLineWidth(5)
      )
    );
  }
  main();
})();
//# sourceMappingURL=build.js.map
