ORBS.setFullScreenGameCss()
var renderer = new ORBS.renderer({renderState: update, bgColor: "crimson", fps: 40})
var scene = new ORBS.scene()
renderer.addToImgCache("https://imagineeeinc.github.io/PickQuick/picker/Favicon/android-chrome-512x512.png", "pickquick") 

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

var scriptCircle = new ORBS.scripComponent()
scriptCircle.attachScript(function(self) {
    if (self.y >= window.innerHeight - 50) {
        self.yMove = 0
    }
    if (self.y > window.innerHeight - 50) {
        self.y = window.innerHeight - 51
    }
    if (self.y < window.innerHeight - 50) {
        self.yMove++
    }
    if (self.yMove > self.maxVelo) {
        self.yMove = self.maxVelo
    }
    self.y = self.y + self.yMove
    return self
})
var circles = new ORBS.obj({type: mesh, drawType: circle})
circles.drawFunc([window.innerWidth/2, 60, 50, "orange"])
circles.attachScript(scriptCircle)
circles.setVars("yMove", 0)
circles.setVars("maxVelo", 150)

scene.add(circles)

console.log(renderer)
console.log(scene)

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.prepend(renderer.canvas)

renderer.startRenderCycle()
renderer.setScene(scene)

var image = new ORBS.obj({type: sprite})
image.drawFunc([window.innerWidth/2, 100, 189, 189, "https://imagineeeinc.github.io/PickQuick/picker/Favicon/android-chrome-512x512.png"])
scene.add(image)