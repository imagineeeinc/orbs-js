ORBS.setFullScreenGameCss()
var renderer = new ORBS.renderer({renderState: update, bgColor: "crimson", fps: 40, width: window.innerWidth, height: window.innerHeight})
var scene = new ORBS.scene()
renderer.addToImgCache("https://imagineeeinc.github.io/PickQuick/picker/Favicon/android-chrome-512x512.png", "pickquick")

var script = new ORBS.scriptComponent(function(self,im,ot) {
    if (self.y > ot.screen.height - 50) {
        self.yMove = -10*ot.delta
    }
    if (self.y < 50) {
        self.yMove = 10*ot.delta
    }
    if (self.x > ot.screen.width - 50) {
        self.xMove = -10*ot.delta
    }
    if (self.x < 50) {
        self.xMove = 10*ot.delta
    }
    self.dx = self.xMove
    self.dy = self.yMove
    return self
})
var rects = new ORBS.obj({type: mesh, drawType: rect, name: "rect"})
rects.drawFunc({x: 50, y: 50, width: 100, height: 100, color: "pink"})
rects.attachScript(script)
rects.setVars("yMove", 3)
rects.setVars("xMove", 3)

scene.add(rects)

var script2 = new ORBS.scriptComponent()
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
script2.imports(function() {return window.scene.getObj("rect")})
var rects2 = new ORBS.obj({type: mesh, drawType: rect, name: "rect2"})
rects2.drawFunc({ x: window.innerWidth-50, y: 50, width: 100, height: 100, color: "lightblue"})
rects2.attachScript(script2)
rects2.setVars("yMove", -3)
rects2.setVars("xMove", -3)

scene.add(rects2)

var scriptCircle = new ORBS.scriptComponent()
scriptCircle.attachScript(function(self, im, ot) {
    if (self.y >= ot.screen.height - 50) {
        self.yMove = 0
    }
    if (self.y > ot.screen.height - 50) {
        self.y = ot.screen.height - 51
    }
    if (self.y < ot.screen.height - 50) {
        self.yMove++
    }
    if (self.yMove > self.maxVelo) {
        self.yMove = self.maxVelo
    }
    self.y = self.y + self.yMove
    return self
})
var circles = new ORBS.obj({type: mesh, drawType: circle, name: "theCircle"})
circles.drawFunc({x: window.innerWidth/2, y: 60, width: 50, color: "orange"})
circles.attachScript(scriptCircle)
circles.setVars("yMove", 0)
circles.setVars("maxVelo", 150)

scene.add(circles)

var txt = new ORBS.obj({type: text, drawType: plainText, name: "theTxt"})
txt.drawFunc({x: 30, y: 30, txt: "wow, thats really cool", font: "25px Verdana", color: "brown", scale: 1})

scene.add(txt)

var lineObj = new ORBS.obj({type: lineRndr, name: "line"})
var linescript = new ORBS.scriptComponent()
linescript.attachScript(function(self, open, ot) {
    self.start = Vect(open.x, open.y)
    self.end = Vect(ot.screen.width, ot.screen.height)
    self.width = (open.y/10)/4
})
linescript.imports(function() {return window.scene.getObj("rect")})
lineObj.attachScript(linescript)
lineObj.drawFunc({x: Vect(1,1), y: Vect(100,100), width: 10, color: "#0080a1"})

scene.add(lineObj)

var custMesh = new ORBS.obj({type: customMesh})
var custShader = new ORBS.scriptComponent()
custShader.attachScript(function(ctx) {
    ctx.beginPath();
    ctx.lineWidth = 2
    ctx.strokeStyle = "#d980a1"
    ctx.moveTo(window.scene.getObj("rect").x, window.scene.getObj("rect").y);
    ctx.quadraticCurveTo(500, 10, window.innerWidth, window.innerHeight);
    ctx.stroke();
})
custMesh.drawFunc({meshShader: custShader})
scene.add(custMesh)

console.log(renderer)
console.log(scene)

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.prepend(renderer.canvas)

renderer.startRenderCycle()
renderer.setScene(scene)

var image = new ORBS.obj({type: sprite, name: "img"})
image.drawFunc({x: window.innerWidth/2, y: 100, width: 189, height: 189, sprite: imgStore.pickquick, dx: 0.01})
scene.add(image)
scene.moveObj(4, 0)

//renderer.onLoop((o) => console.log(o))