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
      this.events.keyBoard = {
        key: "",
        ctrlKey: false,
        shiftKey: false,
        altKey: false,
      };
      this.events.keyBoard.keyStroke = "";
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
