const still = "still"
const update = "update"

const mesh = "mesh"
const customMesh = "customMesh"
const canvasShape = mesh
const sprite = "sprite"
const lineRndr = "lineRenderer"
const line = lineRndr
const text = "text"

const texture = "texture"
const rect = "rect"
const circle = "circle"
const paths = "paths"
const plainText = "plainText"

const hitbox = "hitbox"

const down = "down"
const up = "up"
const drag = "drag"

const defaultFont = "30px Arial"
const error = {
  noSupport: "Your browser dose not support canvas"
}

function echo(txt, ln) {
  console.log(txt)
  return console.trace(txt)
}
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

class CaveRenderEngine {
  constructor(opts) {
    this.bgColor = opts.bgColor
    this.canvasId = opts.canvasId
    this._drawers = this._theDrawers()
    this.campos = [0,0]
    this.lastUpdate = null
    this.deltaTime = 0
  }
  setUpImageCacher() {
    let store = document.createElement("div")
    store.style.display = "none"
    store.id = "caveImageCache" + Math.round(Math.floor(Math.random() * 9999) + 1000)
    document.body.append(store)
    return store.id
  }
  zeroToCenter(is){
    let canvas = document.getElementById(this.canvasId)
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
    } else {
      return [false, error.noSupport]
    }
    if (is === true) {
      ctx.translate(canvas.width/2, canvas.height/2)
    } else if (is === false) {
      ctx.translate(0,0)
    } else {return [false, "no given boolen"]}
  }
  draw(scene, fps, antiAliasing, campos, imgStore, shader, renderer) {
    if (this.lastUpdate == null) {this.lastUpdate = Date.now()}
    let now = Date.now()
    this.fps = fps
    this.scene = scene.vScene
    let canvas = document.getElementById(this.canvasId)
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d', { alpha: false });
    } else {
      return [false, error.noSupport]
    }
    //defaults
    ctx.font = defaultFont
    ctx.imageSmoothingEnabled = antiAliasing
    //background render code
    ctx.fillStyle = this.bgColor
    ctx.clearRect(-50, -50, canvas.width+100, canvas.height+100)
    ctx.fillRect(-50, -50, canvas.width+100, canvas.height+100)
    let ccampos = [campos.x, campos.y]
    if (ccampos[0] != this.campos[0] || ccampos[1] != this.campos[1]) {
      ctx.translate(ccampos[0] - this.campos[0], ccampos[1] - this.campos[1])
      this.campos = ccampos
    }
    //shaders
    if (shader != null || shader != undefined) {
      shader(ctx, {fps: this.fps, screen: canvas, camera: this.campos})
    }
    for (var i=0;i<this.scene.length;i++) {
      let obj = this.scene[i]
      //scripts
      if (obj.scripts != null) {
        let sc = obj.scripts
        let res
        for (var j=0;j<sc.length;j++) {
          let importing = sc[j].importScript || function() {return null}
          let s = sc[j].script
          importing = importing()
          res = s(obj, importing, {fps: this.fps, delta: this.deltaTime, screen: canvas, camera: this.campos, renderer: renderer})
          obj = res || obj
        }
      }
      // move scripts
      if(obj.dx || obj.dy) {
        if (obj.dx) {
          obj.x += obj.dx
        }
        if (obj.dy) {
          obj.y += obj.dy
        }
      }
      //drawing
      if (obj.type == mesh) {
        if (obj.drawType == rect) {
          let response = this._drawers.rect(ctx, [obj.x-((obj.width * obj.scale)/2), obj.y-((obj.height * obj.scale)/2), obj.width * obj.scale, obj.height * obj.scale, obj.color])
        } else if (obj.drawType == circle) {
          let response = this._drawers.circle(ctx, [obj.x-((obj.width * obj.scale)/2), obj.y-((obj.height * obj.scale)/2), obj.width*obj.scale, obj.color])
        }
      } else if (obj.type == sprite) {
        if (obj.drawType == texture) {
          let response = this._drawers.texture(ctx, [obj.x-((obj.width * obj.scale)/2), obj.y-((obj.height * obj.scale)/2), obj.width * obj.scale, obj.height * obj.scale, obj.sprite])
        }
      } else if (obj.type == text) {
        if (obj.drawType == plainText) {
          let response = this._drawers.plainText(ctx, [obj.x-((obj.width * obj.scale)/2), obj.y-((obj.height * obj.scale)/2), obj.txt, obj.font, obj.color])
        }
      } else if (obj.type == line) {
        let response = this._drawers.lineRndr(ctx, [obj.start, obj.end, obj.width, obj.color])
      } else if (obj.type == customMesh) {
        let response = this._drawers.customMesh(ctx, obj.meshShader, {fps: this.fps, delta: this.deltaTime, screen: canvas, camera: this.campos, renderer: renderer}, obj.meshShader.importScript || function() {return null})
      }
    }
    let dt = now - this.lastUpdate
    this.lastUpdate = now
    this.deltaTime = dt/100
    return [true]
  }
  _theDrawers() {
    let drawers = {
      rect: (function(ctx, opts){
        ctx.fillStyle = opts[4]
        ctx.fillRect(opts[0], opts[1], opts[2], opts[3])
        return true
      }),
      circle: (function(ctx, opts){
        ctx.beginPath();
        ctx.arc(opts[0], opts[1], opts[2], 0, 2*Math.PI)
        ctx.fillStyle = opts[3]
        ctx.fill()
        ctx.closePath()
        return true
      }),
      texture: (function(ctx, opts){
        ctx.drawImage(opts[4].img,opts[0], opts[1], opts[2], opts[3])
        return true
      }),
      plainText: (function(ctx, opts){
        ctx.font = opts[3]
        ctx.fillStyle = opts[4]
        ctx.fillText(opts[2], opts[0], opts[1])
        return true
      }),
      lineRndr: (function(ctx, opts){
        ctx.strokeStyle = opts[3]
        ctx.lineWidth = opts[2]
        ctx.beginPath()
        if (opts[0].isVectObj = true) {
          ctx.moveTo(opts[0].x, opts[0].y)
        } else {
          ctx.moveTo(opts[0][0], opts[0][1])
        }
        if (opts[1].isVectObj = true) {
          ctx.lineTo(opts[1].x, opts[1].y)
        } else {
          ctx.lineTo(opts[1][0], opts[1][1])
        }
        ctx.stroke()
        return true
      }),
      customMesh: (function(ctx, shader, others, imps){
        let s = shader.script
        imps = imps()
        s(ctx, imps, others)
        return true
      })
    }
    return drawers
  }
}
class newOrbsScene {
  constructor() {
    this.vScene = []
  }
  add(obj) {
    this.vScene.push(obj)
  }
  scene() {return this.vScene}
  moveObj(old, newI) {
    this.vScene = array_move(this.vScene, old, newI)
  }
  getObj(name) {
    for (var i=0;i<this.vScene.length;i++) {
      if (this.vScene[i].name == name) {
        return this.vScene[i]
      }
    }
  }
  exportSelf() {
    return this
  }
}
//TODO: finish and polish camera
class newOrbsRenderer {
  constructor(opts) {
    if (opts.canvas) {
      this.canvas = opts.canvas
    } else {
      this.canvas = newCanvas()
    }
    this.antiAliasing = opts.antiAliasing || true
    this.canvasId = this.canvas.id
    this.events = {
      hoverOver: false,
      mouse: {
        x:0,
        y:0,
        primaryBtn: up,
        drag: false
      }
    }
    this.imgStore = {}
    this.bgColor = opts.bgColor || "#ffffff"
    this.fps = opts.fps || 30
    this.loop = () => null
    this.renderState = opts.renderState || still
    this.dynamicCamera = opts.dynamicCamera || false
    this.cameraPos = opts.camPos || {x: 0, y: 0}
    this.shader = null
    if (this.renderState == still) {
      this.updater = false
    } else if (this.renderState == update) {
      this.updater = true
    } else {
      console.error("no proper given renderState.\noptions:( update | still )");
    }
    this.scene = opts.scene || new newOrbsScene()
    
    this.cave = new CaveRenderEngine({bgColor: this.bgColor, canvasId: this.canvasId})
    if (opts.disableImageCache == true) {} else {this.storeId = this.cave.setUpImageCacher()}
    function newCanvas() {
      let can = document.createElement("canvas")
      can.id = "orbsCanvas" + Math.round(Math.floor(Math.random() * 9999) + 1000)
      can.innerHTML = "Hmm, Looks like your browser does not support Canvas"
      return can
    }
  }
  startRenderCycle() {
    let cave = this.cave
    //TODO: use this = \/\/\/
    //window.requestAnimationFrame()
    setInterval(() => updateScript(cave, this.loop,this.scene, this.updater, this.fps, this.antiAliasing, this.imaStore,this.cameraPos, this.canvasId, this.shader, this), 1000/this.fps)
    function updateScript(cave, loop, scene, update, fps, antiAliasing, imgStore, campos, canvasId, shader, renderer) {
      if (update === true) {
        loop({fps: fps, screen: document.getElementById(canvasId), camera: campos})
        let response = cave.draw(scene, fps, antiAliasing, campos, imgStore, shader, renderer)
        if (response[0] === false) {
          alert(response[1])
          console.alert(response[1])
        }
      }
    }
  }
  zeroToCenter(is){this.cave.zeroToCenter(is)}
  attachCanvas(can) {
    this.canvas = can
    this.canvasId = this.canvas.id
  }
  addToImgCache(img, name) {
    //TODO: make image store seprate for each instance
    if (img.isImgObj == true) {
      imgStore[name] = image
    } else {
      let image = new newOrbsImage(img, name)
      this.imgStore[name] = image
    }
  }
  setRenderState(state) {
    this.renderState = state || still
    if (this.renderState == still) {
      this.updater = false
    } else if (this.renderState == update) {
      this.updater = true
    } else {
      console.error("no proper given renderState.\noptions:( update | still )");
    }
  }
  setSize(x, y) {
    this.canvas.width = x
    this.canvas.height = y
  }
  setBgColor(c){
    this.bgColor = c
  }
  setScene(scene) {
    this.scene = scene
  }
  draw(scene) {
    this.tempScene = scene
  }
  translateCamera(opts) {
    this.cameraPos = opts
  }
  onLoop(fn) {
    this.loop = fn
  }
  canvasAttactToDom(loc, pre) {
    if (pre == "prepend") {
      loc.prepend(this.canvas)
    } else if (pre == "append") {
      loc.append(this.canvas)
    }
    //TODO: add event listers and system
    document.getElementById(this.canvasId).addEventListener("mouseleave", (e) => {this.events.hoverOver = true})
    document.getElementById(this.canvasId).addEventListener("mousemove", (e) => {
      this.events.mouse.x = e.offsetX - this.cameraPos.x
      this.events.mouse.y = e.offsetY - this.cameraPos.y
      for(var i=0;i < this.scene.vScene.length;i++) {
        if (this.events.mouse.x < this.scene.vScene[i].x+(this.scene.vScene[i].width/2) &&
        this.events.mouse.x > this.scene.vScene[i].x-(this.scene.vScene[i].width/2) &&
        this.events.mouse.y < this.scene.vScene[i].y+(this.scene.vScene[i].height || this.scene.vScene[i].width/2) &&
        this.events.mouse.y > this.scene.vScene[i].y-(this.scene.vScene[i].height || this.scene.vScene[i].width/2)) {
          this.scene.vScene[i].events.mouse.hover = true
        } else {
          this.scene.vScene[i].events.mouse.hover = false
        }
      }
      if (this.events.mouse.primaryBtn == down) {
        this.events.mouse.drag = true
        for(var i=0;i < this.scene.vScene.length;i++) {
          if (this.scene.vScene[i].events.mouse.primaryBtn == down) {
            this.scene.vScene[i].events.mouse.drag = true
          } else {
            this.scene.vScene[i].events.mouse.drag = false
          }
        }
      } else if (this.events.mouse.primaryBtn == up) {
        this.events.mouse.drag = false
        for(var i=0;i < this.scene.vScene.length;i++) {
          this.scene.vScene[i].events.mouse.drag = false
        }
      }
    })
    document.getElementById(this.canvasId).addEventListener("mousedown", (e) => {
      this.mouseDown()
      for(var i=0;i < this.scene.vScene.length;i++) {
        if (this.events.mouse.x < this.scene.vScene[i].x+(this.scene.vScene[i].width/2) &&
        this.events.mouse.x > this.scene.vScene[i].x-(this.scene.vScene[i].width/2) &&
        this.events.mouse.y < this.scene.vScene[i].y+(this.scene.vScene[i].height || this.scene.vScene[i].width/2) &&
        this.events.mouse.y > this.scene.vScene[i].y-(this.scene.vScene[i].height || this.scene.vScene[i].width/2)) {
          this.scene.vScene[i].events.mouse.primaryBtn = down
        }
      }
    })
    document.getElementById(this.canvasId).addEventListener("mouseup", (e) => {
      this.mouseUp()
      for(var i=0;i < this.scene.vScene.length;i++) {
        this.scene.vScene[i].events.mouse.primaryBtn = up
      }
    })
  }
  mouseDown() {
    this.events.mouse.primaryBtn = down
  }
  mouseUp() {
    this.events.mouse.primaryBtn = up
  }
  shaderSet(shader) {
    this.shader = shader
  }
  exportSelf() {
    return this
  }
}
class newOrbsObj {
  constructor(opts) {
    this.name = opts.name || Math.round(Math.floor(Math.random() * 9999) + 1000)
    this.type = opts.type || mesh
    if (this.type == mesh) {
      this.drawType = opts.drawType
    }
    this.drawType = opts.drawType || texture
    if (this.type == line || this.type == customMesh) {
      this.drawType = null
    }
    this.scripts = []
    this.x = opts.x || 0
    this.y = opts.y || 0
    this.width = opts.width || 0
    this.height = opts.height || 0
    this.color = opts.color || "#000"
    this.scale = opts.scale || 1
    this.rotation = opts.rotation || 0
    this.texture = null
    if (opts.drawFunc) {
      this.drawFunc(opts.drawFunc)
    }
    this.events = {
      mouse: {
        hover: false,
        primaryBtn: up,
        drag: false
      }
    }
  }
  _giveCodec() {
    return {type: this.type, drawType: this.drawType, x: this.x, y: this.y, width: this.width, height: this.height, color: this.color}
  }
  attachScript(s) {
    this.scripts.push(s)
  }
  setVars(name, value) {
    this[name] = value
  }
  drawFunc(opts) {
    for (let i=0;i < Object.keys(opts).length;i++) {
      this[Object.keys(opts)[i]] = opts[Object.keys(opts)[i]]
    }
  }
  move(v) {
    let vect = v._giveVector()
    this.x = this.x + vect[0] || this.x
    this.y = this.y + vect[1] || this.y
    this.scale = this.scale + vect[2] || this.scale
    this.rotation = this.rotation + vect[3] || this.rotation
  }
  setPos(v) {
    let vect = v._giveVector()
    this.x = vect[0] || this.x
    this.y = vect[1] || this.y
    this.scale = vect[2] || this.scale
    this.rotation = vect[3] || this.rotation
  }
}

class newOrbsScriptComponent {
  constructor(sc) {this.script = sc || function() {return null}}
  attachScript(s) {this.script = s}
  imports(im) {this.importScript = im}
}
class Vector {
  constructor(x, y, scale, rotation) {
    this.isVectObj = true
    this.x = x || null
    this.y = y || null
    this.scale = scale || null
    this.rot = rotation || null
  }
  _giveVector(){return [this.x, this.y, this.scale, this.rot]}
}
class newOrbsImage {
  constructor(url, name) {
    this.isImgObj = true
    let image = new Image()
    image.src = url
    this.img = image
    this.name = name
  }
}
const ORBS = {
  setFullScreenGameCss: (function() {
    document.body.setAttribute("style", `padding: 0;
    margin: 0;
    height: 100vh`)
  }),
  _: (function() {
    return [
      new newOrbsRenderer(),
      new newOrbsScene()
    ]
  }),
  renderer: newOrbsRenderer,
  scene: newOrbsScene,
  obj: newOrbsObj,
  scriptComponent: newOrbsScriptComponent,
  Vector: Vector,
  Sprite: newOrbsImage,
  Image: newOrbsImage,
  Texture: newOrbsImage
}

window.onOrbsLoad = () => null
setTimeout(() => {window.onOrbsLoad()}, 30)