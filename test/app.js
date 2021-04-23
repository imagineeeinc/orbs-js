ORBS.setFullScreenGameCss()
var renderer = new ORBS.renderer({renderState: update, bgColor: "crimson"})
var scene = new ORBS.scene()

var script = new ORBS.scripComponent()
script.attachScript(function(self) {
    let x = self.x
    x++
    return x
})
var rects = new ORBS.obj({type: mesh, drawType: rect})
rects.drawFunc([10, 10, 150, 100, "springgreen"])

renderer.scene.add(rects)

console.log(renderer)
console.log(scene)

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.prepend(renderer.canvas)

renderer.startRenderCycle()