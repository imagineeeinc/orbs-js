class newOrbsRenderer {
  constructor(opts) {
    if (opts.canvas) {
    this.canvas = opts.canvas
    } else {
      this.canvas = newCanvas()
    }
    this.canvasId = this.canvas.id
    this.bgColor = opts.bgColor || "#ffffff"
    
    
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
  setBgColor(c){
    this.bgColor = c
  }
  draw(scene) {
    this.scene = scene
  }
}

class newOrbsScene {
  constructor() {}
}


const ORBS = {
  renderer: newOrbsRenderer,
  scene: newOrbsScene
}