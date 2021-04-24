const still = "still"
const update = "update"

const mesh = "mesh"
const canvasShape = mesh
const texture = "texture"

const rect = "rect"
const paths = "paths"

const hitbox = "hitbox"

const error = {
  noSupport: "Your browser dose not support canvas"
}

class CaveRenderEngine {
  constructor(opts) {
    this.bgColor = opts.bgColor
    this.canvasId = opts.canvasId
    this._drawers = this._theDrawers()
  }
  setUpImageCacher() {
    let store = document.createElement("div")
    store.style.display = "none"
    store.id = "caveImageCache" + Math.round(Math.floor(Math.random() * 9999) + 1000)
    document.body.append(store)
    return store.id
  }
  //TODO: draw scene function
  draw(scene) {
    this.scene = scene.vScene
    let canvas = document.getElementById(this.canvasId)
    //let ctx = canvas.getContext('2d')
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
    } else {
      return [false, error.noSupport]
    }
    //defaults
    ctx.font = "30px Arial";
    //background render code
    ctx.fillStyle = this.bgColor
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //draw objects
    for (var i=0;i<this.scene.length;i++) {
      let obj = this.scene[i]
      if (obj.scripts != null) {
        let res
        for (var j=0;j<obj.scripts.length;j++) {
          let s = obj.scripts[j].script
          res = s(obj)
          obj = res
        }
      }
      if (obj.type == mesh) {
        if (obj.drawType == rect) {
          let response = this._drawers.rect(ctx, [obj.x-(obj.width/2), obj.y-(obj.height/2), obj.width, obj.height, obj.color])
        }
      }
    }
    return [true]
  }
  _theDrawers() {
    let drawers = {
      rect: (function(ctx, opts){
        ctx.fillStyle = opts[4]
        ctx.fillRect(opts[0], opts[1], opts[2], opts[3]);
        return true
      })
    }
    return drawers
  }
}
class newOrbsScene {
  constructor() {
    this.vScene = []
  }//TODO: orb scene system
  add(obj) {
    this.vScene.push(obj)
  }
}
//TODO: scripting system
class newOrbsRenderer {
  constructor(opts) {
    if (opts.canvas) {
      this.canvas = opts.canvas
    } else {
      this.canvas = newCanvas()
    }
    this.canvasId = this.canvas.id
    this.bgColor = opts.bgColor || "#ffffff"
    this.fps = opts.fps || 30
    this.renderState = opts.renderState || still
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
    setInterval(() => updateScript(cave, this.scene, this.updater), 1000/this.fps)
    function updateScript(cave, scene, update) {
      if (update === true) {
        let response = cave.draw(scene)
        if (response[0] === false) {
          alert(response[1])
          console.alert(response[1])
        }
      }
    }
  }
  attachCanvas(can) {
    this.canvas = can
    this.canvasId = this.canvas.id
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
}

//TODO: do orbs object system and texture system, component script system
class newOrbsObj {
  constructor(opts) {
    this.type = opts.type || mesh
    if (this.type = mesh) {
      this.drawType = opts.drawType
    }
    this.scripts = []
    this.x = 0
    this.y = 0
    this.width = 0
    this.height = 0
    this.color = "#000"
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
    if (this.drawType = rect) {
      this.x = opts[0]
      this.y = opts[1]
      this.width = opts[2]
      this.height = opts[3]
      this.color = opts[4]
    }
  }
}

class newOrbsScriptComponent {
  constructor() {this.script = null}
  attachScript(s) {this.script = s}
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
  scripComponent: newOrbsScriptComponent
}

function echo(txt, ln) {
  return console.log(txt + `[ln: ${ln}]`)
}