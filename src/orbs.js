const still = "still"
const update = "update"
const mesh = "mesh"
const texture = "texture"
const hitbox = "hitbox"

class CaveRenderEngine {
  constructor(opts) {
    this.bgColor = opts.bgColor
    this.canvasId = opts.canvasId
  }
  //TODO: draw scene function
  draw(scene) {
    this.scene = scene
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
    this.scene = opts.scene || new newOrbsScene()
    
    this.cave = new CaveRenderEngine({bgColor: this.bgColor, canvasId: this.canvasId})
    function newCanvas() {
      let can = document.createElement("canvas")
      can.id = "orbsCanvas" + Math.round(Math.floor(Math.random() * 9999) + 1000)
      return can
    }
  }
  attachCanvas(can) {
    this.canvas = can
    this.canvasId = this.canvas.id
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
  constructor() {}
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
  obj: newOrbsObj
}

function echo(txt, ln) {
  return console.log(txt + `[ln: ${ln}]`)
}