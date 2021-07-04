# obs-js

#### NOTE: DOCUMENTION IN PROGRESS

a fast lightweight 2D library that works across a lot of devices. Orbs js renders using HTML5 canvas for more compatibility.

## What to Use Orbs js for and When to Use It
Orbs js is a rendering library that will allow you to create rich, interactive graphics, cross platform applications, and games without having to write a lot of overhead for your project and get extra features like scenes, apis and more.

Orbs js is written to use the [HTML5 Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) for rendering. Out of the box cross-platform compatibility, scenes, camera movement, sprites, shapes, scripting and polished api allows you to create polished and refined experiences relatively quickly with almost no overhead set up.

## Docs
__Documentaion is still progress__

## Instalation/ Setup
It's easy to get started with Orbs js!

Orbs js can be installed simply using a content delivery network (CDN) URL to embed Orbs js directly on your HTML page.
(npm support coming soon)

### CDN Install (via jsdeliver)

__For development:__

```html
<script src="https://cdn.jsdelivr.net/gh/imagineeeinc/orbs-js/src/orbs.js"></script>
```

__For production(recommended for speed):__

```html
<script src="https://cdn.jsdelivr.net/gh/imagineeeinc/orbs-js/src/orbs.min.js"></script>
```
add one of these to the head of the html depending on what you need

## Demos
- [html test use to test(github)](https://github.com/imagineeeinc/orbs-js/blob/main/test/index.html)

## Features
- shapes (meshes)
- texture
- custom shapes (custom meshes using the HTML5 Canvas API)
- Line rendering
- Text
- Object scripting
- Scene system
- primitive camera system
- variable fps with Delta Time
- Planed Features:
	- collision detection
	- physics
	- keyboard and mouse events
	- global scripting
	- html(& markdown) rendering
	- more customisable shapes
	- better camera
	- better debugging
	- enhance for big projects
## Basic Usage/ example

```js
//set css for full screen canvas
ORBS.setFullScreenGameCss()
//initiate a new renderer
var renderer = new ORBS.renderer({renderState: update, bgColor: "crimson", fps: 40, width: window.innerWidth, height: window.innerHeight})
//create a new scene
var scene = new ORBS.scene()
//new script component
var script = new ORBS.scriptComponent()
//add code to the script component
script.attachScript(function(self,im,ot) {
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
    self.x = self.x + self.xMove
    self.y = self.y + self.yMove
    return self
})
//create a object named 'rect'
var rects = new ORBS.obj({type: mesh, drawType: rect, name: "rect"})
//set the mesh to 100 by 100
rects.drawFunc(50, 50, 100, 100, "pink")
//attach the script to the object
rects.attachScript(script)
//set varible 'yMove' to '3' of object 'rects'
rects.setVars("yMove", 3)
//set varible 'xMove' to '3' of object 'rects'
rects.setVars("xMove", 3)
//add the 'rects' object to the scene
scene.add(rects)
//set the renderers dimensions
renderer.setSize(window.innerWidth, window.innerHeight)
//add the canvas to the body of the html
document.body.prepend(renderer.canvas)
//start the render pipeline
renderer.startRenderCycle()
//add the scene to the renderer
renderer.setScene(scene)

```

## License
This content is released under the [MIT License](http://opensource.org/licenses/MIT).