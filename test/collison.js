//const {ORBS, update, mesh, rect, circle, Vect, customMesh, lineRndr, down, up, left, right, sprite, text, plainText, CaveRenderEngine} = orbsCore
const {components} = orbsComponents
const orbComponents = components

ORBS.setFullScreenGameCss()

var renderer = new ORBS.renderer({renderState: update, bgColor: "crimson", fps: 40, width: window.innerWidth, height: window.innerHeight})
var scene = new ORBS.scene()

var locs = JSON.parse(localStorage.getItem("orbsTestCollison"))

scene.collisionLayerSet("boxes")

var script = new ORBS.scriptComponent(function(self,im,ot) {
})

var rects = new ORBS.obj({type: mesh, drawType: rect, name: "rect"})
//                                                                the layer of collision   hitbox options  hitbox shape  width  height    center
rects.vars({x: window.innerWidth/2, y: 100, width: 100, height: 100, color: "pink", collisionLayer: "boxes", hitbox: {shape: rect, width: 100, height: 100, center: [0,0]}, collideReact: true})
rects.attachScript(script)
rects.attachScript(orbComponents.dragableObject())

scene.add(rects)

var rects2 = new ORBS.obj({type: mesh, drawType: rect, name: "rect2"})

rects2.vars({x: 200, y: 200, width: 100, height: 100, color: "blue", collisionLayer: "boxes", hitbox: {shape: rect, width: 100, height: 100, center: [0,0]}})
rects2.attachScript(orbComponents.dragableObject())

scene.add(rects2)

console.log(renderer)
console.log(scene)
renderer.setSize(window.innerWidth, window.innerHeight)
window.onresize = () => renderer.setSize(window.innerWidth, window.innerHeight)

renderer.canvasAttactToDom(document.body, "prepend")

renderer.startRenderCycle()
renderer.setScene(scene)
renderer.on('keyboardEvent', (e)=>{
	if(e.onDirection('left') == true) {
		e.scene.getObj('rect').x-=20*e.delta
	}
	if(e.onDirection('up') == true) {
		e.scene.getObj('rect').y-=20*e.delta
	}
	if(e.onDirection('right') == true) {
		e.scene.getObj('rect').x+=20*e.delta
	}
	if(e.onDirection('down') == true) {
		e.scene.getObj('rect').y+=20*e.delta
	}
	//TODO: move onkey to script rather than on keyboard
})
window.onunload = () => {
	localStorage.setItem("orbsTestCollison", JSON.stringify({
		rect: {x: rects.x, y: rects.y},
		rect2: {x: rects2.x, y: rects2.y}
	}))
}