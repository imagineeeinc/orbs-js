(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global));
}(this, (function (exports) { 'use strict';
// Values
  exports.still = "still";
exports.update = "update";

exports.mesh = "mesh";
exports.customMesh = "customMesh";
exports.canvasShape = mesh;
exports.sprite = "sprite";
exports.lineRndr = "lineRenderer";
exports.line = lineRndr;
exports.text = "text";

exports.texture = "texture";
exports.rect = "rect";
exports.circle = "circle";
exports.paths = "paths";
exports.plainText = "plainText";

exports.hitbox = "hitbox";

exports.down = "down";
exports.up = "up";
exports.left = "left";
exports.right = "right";
//exports.top = "top"
exports.bottom = "bottom";
exports.drag = "drag";

exports.nill = null;

exports.yes = true;
exports.no = false;

exports.Arrow = { left, up, right, down };
exports.keys = {
  left: "ArrowLeft",
  up: "ArrowUp",
  right: "ArrowRight",
  down: "ArrowDown",
};

exports.defaultFont = "30px Arial";
exports.error = {
  noSupport: "Your browser dose not support canvas",
};


	// CaveRenderEngine
  /**
 * @typedef {Object} CaveRendererOption
 * @property {JSON} bgColor - background colour
 * @property {JSON} canvasId - the canvasId
 */

/**
 * A Rendering Engine that can be used render to canvas
 * @param {CaveRendererOptions} options - {@link CaveRendererOption} object
 * containing all components for rendering
 * @returns {renderer}
 */
class CaveRenderEngine {
  constructor(opts) {
    this.bgColor = opts.bgColor;
    this.canvasId = opts.canvasId;
    this._drawers = this._theDrawers();
    this.campos = [0, 0];
    this.lastUpdate = null;
    this.deltaTime = 0;
    this.noUpdate = {};
  }
  setUpImageCacher() {
    let store = document.createElement("div");
    store.style.display = "none";
    store.id =
      "caveImageCache" + Math.round(Math.floor(Math.random() * 9999) + 1000);
    document.body.append(store);
    return store.id;
  }
  zeroToCenter(is) {
    let canvas = document.getElementById(this.canvasId);
    if (canvas.getContext) {
      var ctx = canvas.getContext("2d");
    } else {
      return [false, error.noSupport];
    }
    if (is === true) {
      ctx.translate(canvas.width / 2, canvas.height / 2);
    } else if (is === false) {
      ctx.translate(0, 0);
    } else {
      return [false, "no given boolen"];
    }
  }
  draw(scene,fps,antiAliasing,campos,imgStore,shader,renderer,canvasObj,beforeRender,afterRender,keyboardEvent) {
    if (this.lastUpdate == null) {
      this.lastUpdate = Date.now();
    }
    let now = Date.now();
    this.fps = fps;
    this.scene = scene;
    let canvas = canvasObj() || document.getElementById(this.canvasId);
    if (canvas.getContext) {
      var ctx = canvas.getContext("2d", { alpha: false });
    } else {
      return [false, error.noSupport];
    }
    //TODO: on events system, key events
    beforeRender({
      scene,
      fps,
      antiAliasing,
      campos,
      imgStore,
      shader,
      renderer,
      canvasObj,
    });
    let key = keyboardEvent.event.keyStroke;
    keyboardEvent.callback({
      key,
      event: keyboardEvent.event,
      delta: this.deltaTime,
      scene,
      onDirection: (arrow) => {
        let k = keyEvent(key);
        if (k.indexOf(left) > -1 && arrow == left) {
          return true;
        } else if (k.indexOf(right) > -1 && arrow == right) {
          return true;
        } else if (k.indexOf(down) > -1 && arrow == down) {
          return true;
        } else if (k.indexOf(up) > -1 && arrow == up) {
          return true;
        } else if (k.indexOf("a") > -1 && arrow == left) {
          return true;
        } else if (k.indexOf("d") > -1 && arrow == right) {
          return true;
        } else if (k.indexOf("s") > -1 && arrow == down) {
          return true;
        } else if (k.indexOf("w") > -1 && arrow == up) {
          return true;
        } else {
          return false;
        }
      },
    });
    //defaults
    ctx.font = defaultFont;
    ctx.imageSmoothingEnabled = antiAliasing;
    //background render code
    ctx.fillStyle = this.bgColor;
    ctx.clearRect(-50, -50, canvas.width + 100, canvas.height + 100);
    ctx.fillRect(-50, -50, canvas.width + 100, canvas.height + 100);
    let ccampos = [campos.x, campos.y];
    if (ccampos[0] != this.campos[0] || ccampos[1] != this.campos[1]) {
      ctx.translate(ccampos[0] - this.campos[0], ccampos[1] - this.campos[1]);
      this.campos = ccampos;
    }
    //shaders
    if (shader != null || shader != undefined) {
      shader(ctx, { fps: this.fps, screen: canvas, camera: this.campos });
    }
    for (var i = 0; i < this.scene.vScene.length; i++) {
      let obj = scene.vScene[i];
      //collisions
      if (obj.collisionLayer) {
        if (scene.layers.collision[obj.collisionLayer]) {
          //TODO: circle hitbox
          if (obj.hitbox.shape == rect) {
            var rect1 = {
              x: obj.x - (obj.width * obj.scale) / 2 + obj.hitbox.center[0],
              y: obj.y - (obj.height * obj.scale) / 2 + obj.hitbox.center[1],
              width: obj.hitbox.width,
              height: obj.hitbox.height,
            };
            obj.collision = [];
            for (
              let num = 0;
              num < scene.layers.collision[obj.collisionLayer].length;
              num++
            ) {
              let curObj = scene.getObj(
                scene.layers.collision[obj.collisionLayer][num]
              );
              if (curObj.name != obj.name) {
                if (curObj.hitbox.shape == rect) {
                  let rect2 = {x:curObj.x -(curObj.width * curObj.scale) / 2 +curObj.hitbox.center[0],y:curObj.y -(curObj.height * curObj.scale) / 2 +curObj.hitbox.center[1],width: curObj.hitbox.width,height: curObj.hitbox.height,};
                  //Left
                  if (
                    rect1.x < rect2.x + rect2.width/4 &&
                    rect1.x + rect1.width > rect2.x &&
                    rect1.x + rect1.width < rect2.x + rect2.width/4 &&
                    rect1.y < rect2.y + rect2.height &&
                    rect1.y + rect1.height > rect2.y &&
                    !(rect1.x == rect2.x)
                  ) {
                    obj.collision.push(left);
                    //TODO: kineamatics (basicly self moving)
                    
                  }
                  //Right
                  if (
                    rect1.x > rect2.x + rect2.width*0.75 &&
                    rect1.x + rect1.width > rect2.x + rect2.width &&
                    rect1.x < rect2.x + rect2.width &&
                    rect1.y < rect2.y + rect2.height &&
                    rect1.y + rect1.height > rect2.y &&
                    !(rect1.x == rect2.x)
                  ) {
                    obj.collision.push(right);
                  }
                  //Top
                  if (
                    rect1.y < rect2.y + rect2.height / 2 &&
                    rect1.y + rect1.height > rect2.y &&
                    rect1.y + rect1.height < rect2.y + rect2.height/4 &&
                    rect1.x < rect2.x + rect2.width &&
                    rect1.x + rect1.width > rect2.x &&
                    !(rect1.y == rect2.y)
                  ) {
                    obj.collision.push(up);
                  }
                  //Bottom
                  if (
                    rect1.y > rect2.y + rect2.height*0.75 &&
                    rect1.y + rect1.height > rect2.y + rect2.height &&
                    rect1.y < rect2.y + rect2.height &&
                    rect1.x < rect2.x + rect2.width &&
                    rect1.x + rect1.width > rect2.x &&
                    !(rect1.y == rect2.y)
                  ) {
                    obj.collision.push(down);
                  }
                }
              }
            }
          }
        }
      }
      //scripts
      if (obj.scripts != null) {
        let sc = obj.scripts;
        let res;
        for (var j = 0; j < sc.length; j++) {
          let importing =
            sc[j].importScript ||
            function () {
              return null;
            };
          let s = sc[j].script;
          importing = importing();
          res = s(obj, importing, {fps: this.fps,delta: this.deltaTime,screen: canvas,camera: this.campos,renderer: renderer,
          });
        }
      }
      // move scripts
      if (obj.dx || obj.dy) {
        if (obj.dx) {
          obj.x += obj.dx;
        }
        if (obj.dy) {
          obj.y += obj.dy;
        }
      }
      //drawing
      if (obj.type == mesh) {
        if (obj.drawType == rect) {
          let response = this._drawers.rect(ctx, [
            obj.x - (obj.width * obj.scale) / 2,
            obj.y - (obj.height * obj.scale) / 2,
            obj.width * obj.scale,
            obj.height * obj.scale,
            obj.color,
          ]);
        } else if (obj.drawType == circle) {
          let response = this._drawers.circle(ctx, [
            obj.x - (obj.width * obj.scale) / 2,
            obj.y - (obj.height * obj.scale) / 2,
            obj.width * obj.scale,
            obj.color,
          ]);
        }
      } else if (obj.type == sprite) {
        if (obj.drawType == texture) {
          let response = this._drawers.texture(ctx, [
            obj.x - (obj.width * obj.scale) / 2,
            obj.y - (obj.height * obj.scale) / 2,
            obj.width * obj.scale,
            obj.height * obj.scale,
            obj.sprite,
          ]);
        }
      } else if (obj.type == text) {
        if (obj.drawType == plainText) {
          let response = this._drawers.plainText(ctx, [
            obj.x - (obj.width * obj.scale) / 2,
            obj.y - (obj.height * obj.scale) / 2,
            obj.txt,
            obj.font,
            obj.color,
          ]);
        }
      } else if (obj.type == line) {
        let response = this._drawers.lineRndr(ctx, [
          obj.start,
          obj.end,
          obj.width,
          obj.color,
        ]);
      } else if (obj.type == customMesh) {
        let response = this._drawers.customMesh(
          ctx,
          obj.meshShader,
          {
            fps: this.fps,
            delta: this.deltaTime,
            screen: canvas,
            camera: this.campos,
            renderer: renderer,
          },
          obj.meshShader.importScript ||
            function () {
              return null;
            }
        );
      }
    }
    let dt = now - this.lastUpdate;
    this.lastUpdate = now;
    this.deltaTime = dt / 100;
    afterRender({
      scene,
      fps,
      antiAliasing,
      campos,
      imgStore,
      shader,
      renderer,
      canvasObj,
    });
    return [true];
  }
  _theDrawers() {
    let drawers = {
      rect: function (ctx, opts) {
        ctx.fillStyle = opts[4];
        ctx.fillRect(opts[0], opts[1], opts[2], opts[3]);
        return true;
      },
      circle: function (ctx, opts) {
        ctx.beginPath();
        ctx.arc(opts[0], opts[1], opts[2], 0, 2 * Math.PI);
        ctx.fillStyle = opts[3];
        ctx.fill();
        ctx.closePath();
        return true;
      },
      texture: function (ctx, opts) {
        ctx.drawImage(opts[4].img, opts[0], opts[1], opts[2], opts[3]);
        return true;
      },
      plainText: function (ctx, opts) {
        ctx.font = opts[3];
        ctx.fillStyle = opts[4];
        ctx.fillText(opts[2], opts[0], opts[1]);
        return true;
      },
      lineRndr: function (ctx, opts) {
        ctx.strokeStyle = opts[3];
        ctx.lineWidth = opts[2];
        ctx.beginPath();
        if ((opts[0].isVectObj = true)) {
          ctx.moveTo(opts[0].x, opts[0].y);
        } else {
          ctx.moveTo(opts[0][0], opts[0][1]);
        }
        if ((opts[1].isVectObj = true)) {
          ctx.lineTo(opts[1].x, opts[1].y);
        } else {
          ctx.lineTo(opts[1][0], opts[1][1]);
        }
        ctx.stroke();
        return true;
      },
      customMesh: function (ctx, shader, others, imps) {
        let s = shader.script;
        imps = imps();
        s(ctx, imps, others);
        return true;
      },
    };
    return drawers;
  }
}

  
	// newOrbsScene
	class newOrbsScene {
  constructor() {
    this.vScene = [];
    this.layers = {};
    this.layers.collision = {};
  }
  add(obj) {
    this.vScene.push(obj);
    if (obj.collisionLayer) {
      if (scene.layers.collision[obj.collisionLayer]) {
        scene.layers.collision[obj.collisionLayer].push(obj.name);
      }
    }
  }
  scene() {
    return this.vScene;
  }
  moveObj(old, newI) {
    this.vScene = array_move(this.vScene, old, newI);
  }
  getObj(name) {
    for (var i = 0; i < this.vScene.length; i++) {
      if (this.vScene[i].name == name) {
        return this.vScene[i];
      }
    }
  }
  exportSelf() {
    return this;
  }
  collisionLayerSet(name) {
    this.layers.collision[name] = [];
  }
}

  
	// newOrbsRenderer
	//TODO: finish and polish camera
class newOrbsRenderer {
  constructor(opts) {
    if (opts.canvas) {
      this.canvas = opts.canvas;
    } else {
      this.canvas = newCanvas();
    }
    this.antiAliasing = opts.antiAliasing || true;
    this.canvasId = this.canvas.id;
    this.canvasObj = opts.canvasObj || null;
    this.events = {
      hoverOver: false,
      mouse: {
        x: 0,
        y: 0,
        primaryBtn: up,
        drag: false,
      },
      keyBoard: {
        key: "",
        ctrlKey: false,
        shiftKey: false,
        altKey: false,
        keyStroke: "",
        keysDown: up
      },
    };
    this.onRender = () => null;
    this.onBeforeRender = () => null;
    this.onAfterRender = () => null;
    this.onKeyboardEvent = () => null;
    this.imgStore = {};
    this.bgColor = opts.bgColor || "#ffffff";
    this.fps = opts.fps || 30;
    this.loop = () => null;
    this.renderState = opts.renderState || still;
    this.dynamicCamera = opts.dynamicCamera || false;
    this.cameraPos = opts.camPos || { x: 0, y: 0 };
    this.shader = null;
    if (this.renderState == still) {
      this.updater = false;
    } else if (this.renderState == update) {
      this.updater = true;
    } else {
      console.error("no proper given renderState.\noptions:( update | still )");
    }
    this.scene = opts.scene || new newOrbsScene();

    this.cave = new CaveRenderEngine({
      bgColor: this.bgColor,
      canvasId: this.canvasId,
    });
    if (opts.disableImageCache == true) {
    } else {
      this.storeId = this.cave.setUpImageCacher();
    }
    function newCanvas() {
      let can = document.createElement("canvas");
      can.id =
        "orbsCanvas" + Math.round(Math.floor(Math.random() * 9999) + 1000);
      can.innerHTML = "Hmm, Looks like your browser does not support Canvas";
      return can;
    }
  }
  startRenderCycle() {
    let cave = this.cave;
    this.onRender(this, this.scene);
    //TODO: use this = \/\/\/
    //window.requestAnimationFrame()
    setInterval(
      () =>
        updateScript(
          cave,
          this.canvasObj,
          this.loop,
          this.scene,
          this.updater,
          this.fps,
          this.antiAliasing,
          this.imaStore,
          this.cameraPos,
          this.canvasId,
          this.shader,
          this,
          this.onBeforeRender,
          this.onAfterRender,
          { callback: this.onKeyboardEvent, event: this.events.keyBoard }
        ),
      1000 / this.fps
    );
    function updateScript(
      cave,
      canvasObj,
      loop,
      scene,
      update,
      fps,
      antiAliasing,
      imgStore,
      campos,
      canvasId,
      shader,
      renderer,
      beforeRender,
      afterRender,
      keyboardEvent
    ) {
      if (update === true) {
        loop({
          fps: fps,
          screen: document.getElementById(canvasId),
          camera: campos,
        });
        let response = cave.draw(
          scene,
          fps,
          antiAliasing,
          campos,
          imgStore,
          shader,
          renderer,
          canvasObj,
          beforeRender,
          afterRender,
          keyboardEvent
        );
        if (response[0] === false) {
          alert(response[1]);
          console.alert(response[1]);
        }
      }
    }
  }
  zeroToCenter(is) {
    this.cave.zeroToCenter(is);
  }
  attachCanvas(can) {
    this.canvas = can;
    this.canvasId = this.canvas.id;
  }
  addToImgCache(img, name) {
    //TODO: make image store seprate for each instance
    if (img.isImgObj == true) {
      this.imgStore[name] = img;
    } else {
      let image = new newOrbsImage(img, name);
      this.imgStore[name] = image;
    }
  }
  setRenderState(state) {
    this.renderState = state || still;
    if (this.renderState == still) {
      this.updater = false;
    } else if (this.renderState == update) {
      this.updater = true;
    } else {
      console.error("no proper given renderState.\noptions:( update | still )");
    }
  }
  setSize(x, y) {
    this.canvas.width = x;
    this.canvas.height = y;
  }
  setBgColor(c) {
    this.bgColor = c;
  }
  setScene(scene) {
    this.scene = scene;
  }
  draw(scene) {
    this.tempScene = scene;
  }
  translateCamera(opts) {
    this.cameraPos = opts;
  }
  onLoop(fn) {
    this.loop = fn;
  }
  canvasAttactToDom(loc, pre) {
    if (pre == "prepend") {
      loc.prepend(this.canvas);
    } else if (pre == "append") {
      loc.append(this.canvas);
    }
    this.canvasObj = () => document.getElementById(this.canvas.id);
    //TODO: touch, right, middle mouse btn event listers and keyboard
    document
      .getElementById(this.canvasId)
      .addEventListener("mouseleave", (e) => {
        this.events.hoverOver = true;
      });
    document
      .getElementById(this.canvasId)
      .addEventListener("mousemove", (e) => {
        this.events.mouse.x = e.offsetX - this.cameraPos.x;
        this.events.mouse.y = e.offsetY - this.cameraPos.y;
        for (var i = 0; i < this.scene.vScene.length; i++) {
          if (
            this.events.mouse.x <
              this.scene.vScene[i].x + this.scene.vScene[i].width / 2 &&
            this.events.mouse.x >
              this.scene.vScene[i].x - this.scene.vScene[i].width / 2 &&
            this.events.mouse.y <
              this.scene.vScene[i].y +
                (this.scene.vScene[i].height ||
                  this.scene.vScene[i].width / 2) &&
            this.events.mouse.y >
              this.scene.vScene[i].y -
                (this.scene.vScene[i].height || this.scene.vScene[i].width / 2)
          ) {
            this.scene.vScene[i].events.mouse.hover = true;
          } else {
            this.scene.vScene[i].events.mouse.hover = false;
          }
        }
        if (this.events.mouse.primaryBtn == down) {
          this.events.mouse.drag = true;
          for (var i = 0; i < this.scene.vScene.length; i++) {
            if (this.scene.vScene[i].events.mouse.primaryBtn == down) {
              this.scene.vScene[i].events.mouse.drag = true;
            } else {
              this.scene.vScene[i].events.mouse.drag = false;
            }
          }
        } else if (this.events.mouse.primaryBtn == up) {
          this.events.mouse.drag = false;
          for (var i = 0; i < this.scene.vScene.length; i++) {
            this.scene.vScene[i].events.mouse.drag = false;
          }
        }
      });
    document
      .getElementById(this.canvasId)
      .addEventListener("mousedown", (e) => {
        this.mouseDown();
        for (var i = 0; i < this.scene.vScene.length; i++) {
          if (
            this.events.mouse.x <
              this.scene.vScene[i].x + this.scene.vScene[i].width / 2 &&
            this.events.mouse.x >
              this.scene.vScene[i].x - this.scene.vScene[i].width / 2 &&
            this.events.mouse.y <
              this.scene.vScene[i].y +
                (this.scene.vScene[i].height ||
                  this.scene.vScene[i].width / 2) &&
            this.events.mouse.y >
              this.scene.vScene[i].y -
                (this.scene.vScene[i].height || this.scene.vScene[i].width / 2)
          ) {
            this.scene.vScene[i].events.mouse.primaryBtn = down;
          }
        }
      });
    document.getElementById(this.canvasId).addEventListener("mouseup", (e) => {
      this.mouseUp();
      for (var i = 0; i < this.scene.vScene.length; i++) {
        this.scene.vScene[i].events.mouse.primaryBtn = up;
      }
    });
    document.body.addEventListener("keydown", (e) => {
      let key = "";
      if (e.ctrlKey == true) {
        key += "Ctrl+";
      }
      if (e.shiftKey == true) {
        key += "Shift+";
      }
      if (e.altKey == true) {
        key += "Shift+";
      }
      key += e.key
        .replaceAll(keys.left, left)
        .replaceAll(keys.right, right)
        .replaceAll(keys.up, up)
        .replaceAll(keys.down, down);

      this.events.keyBoard = {
        key: e.key,
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
        altKey: e.altKey,
        keysDown: down
      };
      this.events.keyBoard.keyStroke = key;
    });
    document.body.addEventListener("keyup", (e) => {
      if (this.events.keyBoard.keysDown == down) {
        let key = "";
        if (e.ctrlKey == true) {
          key += "Ctrl+";
        }
        if (e.shiftKey == true) {
          key += "Shift+";
        }
        if (e.altKey == true) {
          key += "Shift+";
        }
        key += e.key
        .replaceAll(keys.left, left)
        .replaceAll(keys.right, right)
        .replaceAll(keys.up, up)
        .replaceAll(keys.down, down);
        
        this.events.keyBoard = {
          key: e.key,
          ctrlKey: e.ctrlKey,
          shiftKey: e.shiftKey,
          altKey: e.altKey,
          keysDown: down
        };
        this.events.keyBoard.keyStroke = key;
      } else {
        this.events.keyBoard = {
          key: "",
          ctrlKey: false,
          shiftKey: false,
          altKey: false,
        };
        this.events.keyBoard.keyStroke = "";
      }
    });
  }
  mouseDown() {
    this.events.mouse.primaryBtn = down;
  }
  mouseUp() {
    this.events.mouse.primaryBtn = up;
  }
  shaderSet(shader) {
    this.shader = shader;
  }
  exportSelf() {
    return this;
  }
  on(ev, fn) {
    if (ev == "render") {
      this.onRender = fn;
    }
    if (ev == "beforeRender") {
      this.onBeforeRender = fn;
    }
    if (ev == "afterRender") {
      this.onAfterRender = fn;
    }
    if (ev == "mouseEvent") {
      this.onMouseEvent = fn;
    }
    if (ev == "keyboardEvent") {
      this.onKeyboardEvent = fn;
    }
  }
}

  
	// newOrbsObj
	class newOrbsObj {
  constructor(opts) {
    this.name =
      opts.name || Math.round(Math.floor(Math.random() * 9999) + 1000);
    this.type = opts.type || mesh;
    if (this.type == mesh) {
      this.drawType = opts.drawType;
    }
    this.drawType = opts.drawType || texture;
    if (this.type == line || this.type == customMesh) {
      this.drawType = null;
    }
    this.scripts = [];
    this.x = opts.x || 0;
    this.y = opts.y || 0;
    this.width = opts.width || 0;
    this.height = opts.height || 0;
    this.color = opts.color || "#000";
    this.scale = opts.scale || 1;
    this.rotation = opts.rotation || 0;
    this.texture = null;
    if (opts.vars) {
      this.vars(opts.vars);
    }
    this.events = {
      mouse: {
        hover: false,
        primaryBtn: up,
        drag: false,
      },
    };
  }
  _giveCodec() {
    return {
      type: this.type,
      drawType: this.drawType,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      color: this.color,
    };
  }
  attachScript(s) {
    this.scripts.push(s);
  }
  setVars(name, value) {
    this[name] = value;
  }
  vars(opts) {
    //TODO: set circle form width to radius and also in render
    for (let i = 0; i < Object.keys(opts).length; i++) {
      this[Object.keys(opts)[i]] = opts[Object.keys(opts)[i]];
    }
  }
  move(v) {
    let vect = v._giveVector();
    this.x = this.x + vect[0] || this.x;
    this.y = this.y + vect[1] || this.y;
    this.scale = this.scale + vect[2] || this.scale;
    this.rotation = this.rotation + vect[3] || this.rotation;
  }
  setPos(v) {
    let vect = v._giveVector();
    this.x = vect[0] || this.x;
    this.y = vect[1] || this.y;
    this.scale = vect[2] || this.scale;
    this.rotation = vect[3] || this.rotation;
  }
  getColide(side) {
    if (side == up || side == top) {
      if (this.collision.indexOf(up) > -1) {
        return true;
      } else {
        return false;
      }
    }
    if (side == down || side == bottom) {
      if (this.collision.indexOf(down) > -1) {
        return true;
      } else {
        return false;
      }
    }
    if (side == left) {
      if (this.collision.indexOf(left) > -1) {
        return true;
      } else {
        return false;
      }
    }
    if (side == right) {
      if (this.collision.indexOf(right) > -1) {
        return true;
      } else {
        return false;
      }
    }
    if (!side) {
      if (this.collision.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  }
  exportSelf() {
    return JSON.parse(JSON.stringify(this));
  }
}


  // extraFunc
	class newOrbsScriptComponent {
  constructor(sc) {
    this.script =
      sc ||
      function () {
        return null;
      };
  }
  attachScript(s) {
    this.script = s;
  }
  imports(im) {
    this.importScript = im;
  }
}
class Vector {
  constructor(x, y, scale, rotation) {
    this.isVectObj = true;
    this.x = x || null;
    this.y = y || null;
    this.scale = scale || null;
    this.rot = rotation || null;
  }
  _giveVector() {
    return [this.x, this.y, this.scale, this.rot];
  }
}
class newOrbsImage {
  constructor(url, name) {
    this.isImgObj = true;
    let image = new Image();
    image.src = url;
    this.img = image;
    this.name = name;
    this.url = url;
  }
}
function keyEvent(key) {
  return key.split("+");
}
exports.ORBS = {
  setFullScreenGameCss: function () {
    document.body.setAttribute(
      "style",
      `padding: 0;
		margin: 0;
		height: 100vh`
    );
  },
  _: function () {
    return [new newOrbsRenderer(), new newOrbsScene()];
  },
  keyEvent: keyEvent,
  renderer: newOrbsRenderer,
  scene: newOrbsScene,
  obj: newOrbsObj,
  scriptComponent: newOrbsScriptComponent,
  Vector: Vector,
  Sprite: newOrbsImage,
  Image: newOrbsImage,
  Texture: newOrbsImage,
};

function array_move(arr, old_index, new_index) {
	if (new_index >= arr.length) {
			var k = new_index - arr.length + 1;
			while (k--) {
					arr.push(undefined);
			}
	}
	arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
	return arr; // for testing
}
function Vect(x, y, s, r) {
	return new Vector(x, y, s, r)
}

  //Object.defineProperty(exports, '__esModule', { value: true });
})))
