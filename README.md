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

Orbs js can be installed simply using a content delivery network (CDN) URL to embed Orbs js directly on your HTML page or using the npm module

### CDN Install (via jsdeliver)

__For development:__

```html
<script src="https://cdn.jsdelivr.net/gh/imagineeeinc/orbs-js@1.3.0/src/orbs.js"></script>
```

__For production(recommended for speed):__

```html
<script src="https://cdn.jsdelivr.net/gh/imagineeeinc/orbs-js@1.3.0/src/orbs.min.js"></script>
```

__If you want the library to be downloaded__

(Not good for offline)

```html
<script src="https://cdn.jsdelivr.net/gh/imagineeeinc/orbs-js@1.3.0/src/orbs.pkg.min.js"></script>
```

__For the components provided__

```html
<script src="https://cdn.jsdelivr.net/gh/imagineeeinc/orbs-js@1.3.0/src/orbs.components.js"></script>
```

__If you want the components with the downloader__

add this to the head

```html
<orbs-settings s='{"getComponents": true}''></orbs-settings>
```

add one of these to the head of the html depending on what you need

__And NPM Module available at [npm](https://www.npmjs.com/package/orbs-js)__

install using the bellow in the command line to add to your project.

```bash
npm i orbs-js
```

## Demos
- [html test use to test (github)](https://github.com/imagineeeinc/orbs-js/blob/main/test/index.html)
- [html test used to test (live)](https://imagineeeinc.github.io/orbs-js/test/)
- Example code on [jsfiddle](https://jsfiddle.net/Imagineee/1pzmrjLt/26/)

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
- mouse events for left button
- pre made components available
- package downloader (downloads the library and any extra things needed)
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
//create a object named 'rect'
var rects = new ORBS.obj({type: mesh, drawType: rect, name: "rect"})
//set the mesh to 100 by 100@50, 50 with pink color
rects.drawFunc({x: 50, y: 50, width: 100, height: 100, color: "pink"})
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
//prepend the canvas to the body of the html and setup event listeners
renderer.canvasAttactToDom(document.body, "prepend")
//start the render pipeline
renderer.startRenderCycle()
//add the scene to the renderer
renderer.setScene(scene)

```

## License
This content is released under the [MIT License](http://opensource.org/licenses/MIT).
