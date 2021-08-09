# Orbs JS

#### NOTE: DOCUMENTION IN PROGRESS

 [![](https://camo.githubusercontent.com/f8d1b4095d5ab1f3d3886f09e567d4cd981534cbbceb3b0eea9aa341f8fe6075/68747470733a2f2f696d6167696e656565696e632e6769746875622e696f2f6f7262732d6a732f6f7262732e706e67)](https://camo.githubusercontent.com/f8d1b4095d5ab1f3d3886f09e567d4cd981534cbbceb3b0eea9aa341f8fe6075/68747470733a2f2f696d6167696e656565696e632e6769746875622e696f2f6f7262732d6a732f6f7262732e706e67)

[![npm bundle size](https://camo.githubusercontent.com/a6a794301bb1f5d5905206d6f457489ba8b8e3d91876b8eca33b793bd282e710/68747470733a2f2f696d672e736869656c64732e696f2f62756e646c6570686f6269612f6d696e2f6f7262732d6a733f6c6f676f3d6e706d)](https://camo.githubusercontent.com/a6a794301bb1f5d5905206d6f457489ba8b8e3d91876b8eca33b793bd282e710/68747470733a2f2f696d672e736869656c64732e696f2f62756e646c6570686f6269612f6d696e2f6f7262732d6a733f6c6f676f3d6e706d) [![npm downloads](https://camo.githubusercontent.com/b538a40742051f7f7655959106816e3920deeefc3c979cf2e39ed1c68d7292f2/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f646d2f6f7262732d6a733f6c6f676f3d6e706d)](https://camo.githubusercontent.com/b538a40742051f7f7655959106816e3920deeefc3c979cf2e39ed1c68d7292f2/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f646d2f6f7262732d6a733f6c6f676f3d6e706d) [![npm version](https://camo.githubusercontent.com/a8d0b3776a60c40a85c776381b71e403f2d2c0e5b24561e8b46d6b616c3188a8/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f6f7262732d6a733f6c6f676f3d6e706d)](https://camo.githubusercontent.com/a8d0b3776a60c40a85c776381b71e403f2d2c0e5b24561e8b46d6b616c3188a8/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f6f7262732d6a733f6c6f676f3d6e706d) [![GitHub](https://camo.githubusercontent.com/12329878d77298a41e71afb03b0f655f479653667964058889091b441619aae4/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f696d6167696e656565696e632f6f7262732d6a733f6c6f676f3d676974687562)](https://camo.githubusercontent.com/12329878d77298a41e71afb03b0f655f479653667964058889091b441619aae4/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f696d6167696e656565696e632f6f7262732d6a733f6c6f676f3d676974687562)

Create beautiful 2D content for the web with a fast lightweight 2D library that works across a lot of devices using HTML5 canvas for the most compatibility.

## What to Use Orbs js for and When to Use It

Orbs js is a rendering library that will allow you to create rich, interactive graphics, cross platform applications, and games without having to write a lot of overhead for your project and get extra features like scenes, apis and more.

Orbs js is written to use the [HTML5 Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) for rendering. Out of the box cross-platform compatibility, scenes, camera movement, sprites, shapes, scripting and polished api allows you to create polished and refined experiences relatively quickly with almost no overhead set up.

## Docs

**Documentation is still progress**

## Instalation/ Setup

It's easy to get started with Orbs js!

Orbs js can be installed simply using a content delivery network \(CDN\) URL to embed Orbs js directly on your HTML page or using the npm module

| Inatalation Options | Type | Description | Instaling | Usage |
| :--- | :--- | :--- | :--- | :--- |
| JsDeliver | CDN | Simplest, for beginers, components avalible \(Browser\) | [learn to install here]() | [Learn to use here]() |
| UNPKG | CDN | Complex, use if you know what you want to do, componets avalible \(Browser\) | [leran to install here]() | [Learn to use here]() |
| Download | downloaded | Easy, just download and use in your project \(Browser, Node js, Deno\) | [leran to install here]() | [Learn to use here]() |
| Bundle.run | CDN | Simple, for people who know how to use js import staments; has components and core in one import \(Browser\) | [learn to install and use here]() | [learn to install and use here]() |
| Skypack | CDN | Kind of complex, components not working, for people who like complex cdns \(Browser\) | [learn to install and use here]() | [learn to install and use here]() |
| Npm module | module | For usage in node js projects \(node js projects, browser\[kind of\]\) | [learn to install and use here]() | [learn to install and use here]() |
| Deno module | module | For usage in deno projects \(deno projects\) | [learn to install here]() | [Learn to use here]() |

### CDN Install \(via jsdeliver\)

_**Simplest Install**_

 "&gt;

```text

<script src="https://cdn.jsdelivr.net/gh/imagineeeinc/orbs-js/src/orbs.js">script>


<script src="https://cdn.jsdelivr.net/gh/imagineeeinc/orbs-js/src/orbs.min.js">script>


<script src="https://cdn.jsdelivr.net/gh/imagineeeinc/orbs-js/src/orbs.components.js">script>

<script src="https://cdn.jsdelivr.net/gh/imagineeeinc/orbs-js/src/orbs.components.min.js">script>
```

### CDN Install \(via unpkg\)

 "&gt;

```text

<script src="https://bundle.run/orbs-js@1.3.2">script>
```

easily import in your js with this:

```text
// Import 'orbsCore' and 'components' if needed from 'orbsJs'
// make sure to include the bunde.run url in the head
const {orbsCore, components} = orbsJs

// swap the values in the currly braces for what you need to import
const {ORBS, update, mesh, rect, Vect, down} = orbsCore

// use components how you would like 'components.whatComponentNeeded()'
```

### CDN Install \(via skypack\)

**Use import like this in your js**

```text
import orbsJs from 'https://cdn.skypack.dev/orbs-js';
```

**And Import the the functions and values like this**

```text
// swap the values in the currly braces for what you need to import
const {ORBS, update, mesh, rect, Vect, down} = orbsJs

// Components dosen't seem to work with skypack currently so use one off the other options from before.
```

full example for skypack:

```text
// importing the orbs js libary from skypack
import orbsJs from 'https://cdn.skypack.dev/orbs-js/';

// swap the values in the currly braces for what you need to import
const {ORBS, update, mesh, rect, Vect, down} = orbsJs
```

### Npm Module available at [npm](https://www.npmjs.com/package/orbs-js)

install using the bellow in the command line to add to your project.

```text
# npm
npm i orbs-js

# yarn
yarn add orbs-js
```

**Usage in your js file**

```text
// use the 'orbsCore' to import the main liabry and 'components' import the components
const {orbsCore, components} = require('orbs-js')

// swap the values in the currly braces for what you need to import
const {ORBS, update, mesh, rect, Vect, down} = orbsCore

// use components how you would like 'components.whatComponentNeeded()'
```

### For Deno

if you are looking for deno you can use the skypack url: `https://cdn.skypack.dev/orbs-js?dts`. for skypack usage go [here]()

Or the deno.land/x package:

* [Core Engine](https://deno.land/x/orbs_js/orbs.js)
* [Core Engine \(minified\)](https://deno.land/x/orbs_js/orbs.min.js)
* [components](https://deno.land/x/orbs_js/orbs.components.js)
* [components \(minified\)](https://deno.land/x/orbs_js/orbs.components.min.js) [usage for deno.land x package]()

## Demos

* [html test use to test \(github\)](https://github.com/imagineeeinc/orbs-js/blob/main/test/index.html)
* [npm module test using jest \(github\)](https://github.com/imagineeeinc/orbs-js/blob/main/test/test_npm.test.js)
* [html test used to test \(live\)](https://imagineeeinc.github.io/orbs-js/test/)
* Example for v1.3.0 on [jsfiddle](https://jsfiddle.net/Imagineee/1pzmrjLt/26/)
* Example for v1.3.1 and above on [codepen](https://codepen.io/imagineeeinc/pen/abWYjLN)

## Features

* shapes \(meshes\)
* texture
* custom shapes \(custom meshes using the HTML5 Canvas API\)
* Line rendering
* Text
* Object scripting
* Scene system
* primitive camera system
* variable fps with Delta Time
* mouse events for left button
* pre made components available
* package downloader \(downloads the library and any extra things needed\)
* Planed Features:
  * collision detection
  * physics
  * keyboard and mouse events
  * global scripting
  * html\(& markdown\) rendering
  * more customisable shapes
  * better camera
  * better debugging
  * enhance for big projects

## Basic Usage/ example

```text
//import functions and values needed
//use 'orbsJs' instead of 'orbsCore' if using skypack
//if using bundle.run use the import core statment first which is bellow \/
//const {orbsCore} = orbsJs
const {ORBS, update, mesh, rect, Vect, down} = orbsCore
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

