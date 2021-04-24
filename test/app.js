ORBS.setFullScreenGameCss()
var renderer = new ORBS.renderer({renderState: update, bgColor: "crimson"})
var scene = new ORBS.scene()

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
var rects = new ORBS.obj({type: mesh, drawType: rect})
rects.drawFunc([50, 50, 100, 100, "pink"])
rects.attachScript(script)
rects.setVars("yMove", 3)
rects.setVars("xMove", 3)

scene.add(rects)

var script2 = new ORBS.scripComponent()
script2.attachScript(function(self, open) {
    /*
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
    */
    self.y = open.y
    return self
})
script2.imports(function() {return window.renderer.scene.vScene[0]})
var rects2 = new ORBS.obj({type: mesh, drawType: rect})
rects2.drawFunc([window.innerWidth-50, 50, 100, 100, "lightblue"])
rects2.attachScript(script2)
rects2.setVars("yMove", -3)
rects2.setVars("xMove", -3)

scene.add(rects2)

console.log(renderer)
console.log(scene)

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.prepend(renderer.canvas)

renderer.startRenderCycle()
renderer.setScene(scene)