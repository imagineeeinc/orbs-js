//window.onOrbsLoad = () => {
ORBS.setFullScreenGameCss()
var renderer = new ORBS.renderer({renderState: update, bgColor: "crimson", fps: 40, width: window.innerWidth, height: window.innerHeight})
var scene = new ORBS.scene()
renderer.addToImgCache("https://imagineeeinc.github.io/PickQuick/picker/Favicon/android-chrome-512x512.png", "pickquick")

var script = new ORBS.scriptComponent(function(self,im,ot) {
    if (self.events.mouse.primaryBtn != down) {
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
    self.dy = self.yMove}
    if (self.events.mouse.primaryBtn == down) {
		self.scale = 1.1
    } else {
        self.scale = 1
    }
    return self
})
var rects = new ORBS.obj({type: mesh, drawType: rect, name: "rect"})
rects.drawFunc({x: 50, y: 50, width: 100, height: 100, color: "pink"})
rects.attachScript(script)
rects.attachScript(orbComponents.dragableObject())
rects.setVars("yMove", 3)
rects.setVars("xMove", 3)

scene.add(rects)

var script2 = new ORBS.scriptComponent()
script2.attachScript(function(self, open, other) {
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
    */if (self.events.mouse.primaryBtn != down) {
        self.y = open.y
        if (self.x > other.screen.width - 50) {
            self.x = other.screen.width - 50
        }
    }
    if (self.events.mouse.primaryBtn == down) {
		self.scale = 1.1
    } else {
        self.scale = 1
    }
    return self
})
script2.imports(function() {return window.scene.getObj("rect")})
var rects2 = new ORBS.obj({type: mesh, drawType: rect, name: "rect2"})
rects2.drawFunc({ x: window.innerWidth-50, y: 50, width: 100, height: 100, color: "lightblue"})
rects2.attachScript(script2)
rects2.attachScript(orbComponents.dragableObject())
rects2.setVars("yMove", -3)
rects2.setVars("xMove", -3)

scene.add(rects2)

var scriptCircle = new ORBS.scriptComponent()
scriptCircle.attachScript(function(self, im, ot) {
    if (self.events.mouse.primaryBtn != down) {
        if (self.y >= ot.screen.height - 50) {
            if (self.yMove < 1) {
                self.yMove = 0
                self.y = ot.screen.height - 50
            } else {
                self.yMove = self.yMove / -2.5
            }
        }
        if (self.y >= ot.screen.height - 50) {
            self.y = ot.screen.height - 49
        }
        if (self.y < ot.screen.height - 50) {
            self.yMove += self.mass/1
        }
        if (self.yMove > self.maxVelo) {
            self.yMove = self.maxVelo
        }
        self.dy = self.yMove
    }
    if (self.events.mouse.primaryBtn == down) {
		self.scale = 1.1
    } else {
        self.scale = 1
    }
    return self
})
var circles = new ORBS.obj({type: mesh, drawType: circle, name: "theCircle"})
circles.drawFunc({x: window.innerWidth/2, y: 0, width: 50, color: "orange"})
circles.attachScript(scriptCircle)
circles.attachScript(orbComponents.dragableObject())
circles.setVars("yMove", 0)
circles.setVars("maxVelo", 150)
circles.setVars("mass", 2)

scene.add(circles)

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
custShader.attachScript(function(ctx, imps, others) {
    ctx.beginPath()
    ctx.lineWidth = 2
    ctx.strokeStyle = "#d980a1"
    ctx.moveTo(window.scene.getObj("rect2").x, window.scene.getObj("rect2").y)
    ctx.quadraticCurveTo(500, 10, others.screen.width, others.screen.height)
    ctx.stroke()

    ctx.fillStyle = "springgreen"
    ctx.fillRect(25, 5, 340, 70)
})
custMesh.drawFunc({meshShader: custShader})
scene.add(custMesh)

console.log(renderer)
console.log(scene)
renderer.setSize(window.innerWidth, window.innerHeight)
window.onresize = () => renderer.setSize(window.innerWidth, window.innerHeight)

renderer.canvasAttactToDom(document.body, "prepend")

renderer.startRenderCycle()
renderer.setScene(scene)

var image = new ORBS.obj({type: sprite, name: "img"})
image.drawFunc({x: window.innerWidth/2, y: 100, width: 189, height: 189, sprite: renderer.imgStore.pickquick, dx: 0.01})
image.attachScript(orbComponents.dragableObject())
scene.add(image)
var txt = new ORBS.obj({type: text, drawType: plainText, name: "theTxt",
drawFunc: {x: 30, y: 35, txt: "Orbs JS Test Suite", font: "35px Verdana", color: "orange", scale: 1}
})
scene.add(txt)

var txt2 = new ORBS.obj({type: text, drawType: plainText, name: "theTxt",
drawFunc: {x: 30, y: 60, txt: "wow, thats really cool", font: "20px Verdana", color: "maroon", scale: .5}
})

scene.add(txt2)
scene.moveObj(4, 0)

new ORBS.Sprite("https://imagineeeinc.github.io/PickQuick/picker/Favicon/android-chrome-512x512.png")

//renderer.shaderSet((ctx) => ctx.filter = 'contrast(1.4) sepia(.2) drop-shadow(-9px 9px 3px #e81)')

//renderer.onLoop((o) => console.log(o))