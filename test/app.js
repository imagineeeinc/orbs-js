ORBS.setFullScreenGameCss()
var renderer = new ORBS.renderer({renderState: update, bgColor: "crimson", fps: 60})
var scene = new ORBS.scene()

var script = new ORBS.scripComponent()
script.attachScript(function(self) {
    if (self.y > window.innerHeight - 50) {
        self.yMove = -1.5
    }
    if (self.y < 50) {
        self.yMove = 1.5
    }
    if (self.x > window.innerWidth - 50) {
        self.xMove = -1.5
    }
    if (self.x < 50) {
        self.xMove = 1.5
    }
    self.x = self.x + self.xMove
    self.y = self.y + self.yMove
    return self
})
var rects = new ORBS.obj({type: mesh, drawType: rect})
rects.drawFunc([50, 50, 100, 100, "pink"])
rects.attachScript(script)
rects.setVars("yMove", 1.5)
rects.setVars("xMove", 1.5)

scene.add(rects)

var script = new ORBS.scripComponent()
script.attachScript(function(self) {
    if (self.y > window.innerHeight - 50) {
        self.yMove = -3
    }
    if (self.y < 50) {
        self.yMove = 3
    }
    if (self.x > window.innerWidth - 50) {
        self.xMove = -3
    }
    if (self.x < 50) {
        self.xMove = 3
    }
    self.x = self.x + self.xMove
    self.y = self.y + self.yMove
    return self
})
var rects2 = new ORBS.obj({type: mesh, drawType: rect})
rects2.drawFunc([window.innerWidth-50, 50, 100, 100, "lightblue"])
rects2.attachScript(script)
rects2.setVars("yMove", -3)
rects2.setVars("xMove", -3)

scene.add(rects2)

console.log(renderer)
console.log(scene)

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.prepend(renderer.canvas)

renderer.startRenderCycle()
renderer.setScene(scene)