"use strict";
(() => {
  // src/datatypes/point.ts
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

  // src/ui/elements/CubismElement.ts
  var CubismElement = class {
    constructor() {
      this.position = new Point2D(0, 0);
      this.size = new Point2D(0, 0);
      this.c = null;
    }
    setCanvasDrawer(c) {
      this.c = c;
    }
    setWidth(width) {
      this.size.x = width;
      return this;
    }
    setHeight(height) {
      this.size.y = height;
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
  };

  // src/ui/elements/RectangleElement.ts
  var RectangleElement = class extends CubismElement {
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
    render() {
      super.render();
      let c = this.c;
      c.setFillStyle(this.background);
      c.setStrokeStyle("black");
      c.setStrokeWidth(this.lineWidth);
      c.translate(this.position);
      c.drawRect(0, 0, this.size.x, this.size.y);
      c.restoreTranslate();
      c.restoreFillStyle();
    }
  };

  // src/ui/elements/layouts/LayoutElement.ts
  var LayoutElement = class extends CubismElement {
    constructor(...children) {
      super();
      this.children = [];
      this.children = children;
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
  };

  // src/ui/elements/InteractiveElement.ts
  var InteractiveElement = class extends RectangleElement {
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
    triggerOnMove(point) {
      for (let callback of this.onMove) {
        callback(point);
      }
    }
    pushOnMove(...callbacks) {
      this.pushOn("move", ...callbacks);
      return this;
    }
    removeOnMove(callback) {
      this.removeOn("move", callback);
    }
    get onMove() {
      return this.getOn("move");
    }
  };

  // src/datatypes/PointerPoint.ts
  var PointerPoint = class extends Point2D {
    constructor(x, y, pressure) {
      super(x, y);
      this.pressure = pressure;
    }
    toString() {
      return `(x:${this.x}, y:${this.y}, p:${this.pressure})`;
    }
  };

  // src/ui/State.ts
  var CubismState = class {
    constructor() {
      this.lineWidths = [10];
      this.fillStyles = ["gray"];
      this.strokeStyles = ["black"];
      this.translates = [new Point2D(0, 0)];
      this.needsRedraw = true;
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
    popFillStyle() {
      if (this.fillStyles.length > 1) {
        this.fillStyles.pop();
      }
      return this.fillStyle;
    }
    set strokeStyle(style) {
      this.strokeStyles.push(style);
    }
    get strokeStyle() {
      return this.strokeStyles[this.strokeStyles.length - 1];
    }
    popStrokeStyle() {
      if (this.strokeStyles.length > 1) {
        this.strokeStyles.pop();
      }
      return this.strokeStyle;
    }
    set translate(offset) {
      console.log("set translate", offset.x, offset.y);
      this.translates.push(offset);
      console.log("Current translates", this.translates);
      console.log("Size", this.translates.length);
    }
    get translate() {
      return this.translates[this.translates.length - 1];
    }
    popTranslate() {
      if (this.translates.length > 1) {
        this.translates.pop();
      }
      return this.translate;
    }
  };

  // src/constants/constants.ts
  var Values = class {
  };
  Values.FRAME_UPDATE = "onFrameUpdate";
  Values.FIX_UPDATE = "onFixUpdate";
  Values.REDRAW = "onRedraw";
  Values.POINTER_DOWN = "onMouseDown";
  Values.POINTER_UP = "onMouseUp";
  Values.POINTER_MOVE = "onMouseMove";

  // src/ui/CanvasDrawer.ts
  var CanvasDrawer = class {
    constructor(canvas, globalEvent) {
      this.state = new CubismState();
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
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
    restoreFillStyle() {
      this.ctx.fillStyle = this.state.popFillStyle();
    }
    translate(offset) {
      console.log("translate", offset);
      this.state.translate = offset;
      this.ctx.translate(offset.x, offset.y);
    }
    restoreTranslate() {
      let lastTranslate = this.state.popTranslate();
      console.log("restoreTranslate", lastTranslate.x, lastTranslate.y);
      this.ctx.translate(-lastTranslate.x, -lastTranslate.y);
    }
    drawText(text, x, y) {
      this.ctx.fillText(text, x, y);
    }
    setStrokeStyle(color) {
      this.ctx.strokeStyle = color;
      this.state.strokeStyle = color;
    }
    restoreStrokeStyle() {
      this.ctx.strokeStyle = this.state.popStrokeStyle();
    }
    setStrokeWidth(width) {
      this.ctx.lineWidth = width;
      this.state.lineWidth = width;
    }
    restoreStrokeWidth() {
      this.ctx.lineWidth = this.state.popLineWidth();
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
  };

  // src/ui/CubismGlobalEventSystem.ts
  var CubismGlobalEventSystem = class {
    constructor() {
      this._globalEventListeners = {};
    }
    registerGlobalEvent(event, callback) {
      if (this._globalEventListeners[event] === void 0) {
        this._globalEventListeners[event] = [];
      }
      this._globalEventListeners[event].push(callback);
    }
    unregisterGlobalEvent(event, callback) {
      this._globalEventListeners[event].splice(this._globalEventListeners[event].indexOf(callback), 1);
    }
    triggerGlobalEvent(event, ...args) {
      if (this._globalEventListeners[event] === void 0) {
        return;
      }
      this._globalEventListeners[event].forEach((callback) => {
        callback(...args);
      });
    }
  };

  // src/ui/CubismEventManager.ts
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

  // src/ui/Cubism.ts
  var Cubism = class {
    constructor(canvas) {
      this.root = new CubismElement();
      this.globalEvent = new CubismGlobalEventSystem();
      this.canvasDrawer = new CanvasDrawer(canvas, this.globalEvent);
      this.eventManger = new CubismEventManager(this.globalEvent);
      this.registerRedraw();
    }
    registerRedraw() {
      this.globalEvent.registerGlobalEvent(Values.REDRAW, this.update.bind(this));
    }
    static createFromCanvas(canvas) {
      return new Cubism(canvas);
    }
    static createFromId(id) {
      return Cubism.createFromCanvas(document.getElementById(id));
    }
    init(root) {
      this.setRootElement(root);
      this.setElementCanvas();
      this.canvasDrawer.state.needsRedraw = true;
    }
    setElementCanvas() {
      this.root.setCanvasDrawer(this.canvasDrawer);
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

  // src/index.ts
  console.log("loading index.ts");
  function main() {
    let canvas = document.getElementById("mainCanvas");
    let c = Cubism.createFromCanvas(canvas);
    let interactive = new InteractiveElement().pushOnMove((point) => {
      console.log("move" + point);
    }).setWidth(100).setHeight(100).setBackgroundColor("green").setPosFromXY(40, 40);
    canvas.onpointermove = (e) => {
      interactive.triggerOnMove(new PointerPoint(e.offsetX, e.offsetY, e.pressure));
    };
    c.init(
      new LayoutElement(
        new RectangleElement().setWidth(100).setHeight(100).setBackgroundColor("red").setPosFromXY(0, 0),
        new RectangleElement().setWidth(100).setHeight(100).setBackgroundColor("blue").setPosFromXY(40, 40).setLineWidth(5),
        interactive
      )
    );
  }
  main();
})();
//# sourceMappingURL=build.js.map
