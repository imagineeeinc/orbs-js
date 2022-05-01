# obs-js

#### NOTE: DOCUMENTION IN PROGRESS

<p align="center">
  <img src="https://imagineeeinc.github.io/orbs-js/orbs.png" width="20%">
</p>

![npm bundle size](https://img.shields.io/bundlephobia/min/orbs-js?logo=npm)
![npm downloads](https://img.shields.io/npm/dm/orbs-js?logo=npm)
![npm version](https://img.shields.io/npm/v/orbs-js?logo=npm)
![GitHub](https://img.shields.io/github/license/imagineeeinc/orbs-js?logo=github)

Create beautiful 2D content for the web with a fast lightweight 2D library that works across a lot of devices using HTML5 canvas for the most compatibility.

## What to Use Orbs js for and When to Use It

Orbs js is a rendering library that will allow you to create rich, interactive graphics, cross platform applications, and games without having to write a lot of overhead for your project and get extra features like scenes, apis and more.

Orbs js is written to use the [HTML5 Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) for rendering. Out of the box cross-platform compatibility, scenes, camera movement, sprites, shapes, scripting and polished api allows you to create polished and refined experiences relatively quickly with almost no overhead set up.

## Docs

__Documentation is still progress__

Read the docs [here](https://imagineee.gitbook.io/orbs-js/) on gitbook

## Instalation/ Setup

It's easy to get started with Orbs js!

Orbs js can be installed simply using a content delivery network (CDN) URL to embed Orbs js directly on your HTML page or using the npm module


| Inatalation Options | Type       | Description                                                                                                | Instaling                                                     | Usage                                                         |
| --------------------- | ------------ | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- | --------------------------------------------------------------- |
| JsDeliver           | CDN        | Simplest, for beginers, components avalible (Browser)                                                      | [learn to install here](#cdn-install-via-jsdeliver)           | [Learn to use here](#usage-for-all-of-the-above)              |
| UNPKG               | CDN        | Complex, use if you know what you want to do, componets avalible (Browser)                                 | [leran to install here](#cdn-install-via-unpkg)               | [Learn to use here](#usage-for-all-of-the-above)              |
| Download            | downloaded | Easy, just download and use in your project (Browser, Node js, Deno)                                       | [leran to install here](#download)                            | [Learn to use here](#usage-for-all-of-the-above)              |
| Bundle.run          | CDN        | Simple, for people who know how to use js import staments; has components and core in one import (Browser) | [learn to install and use here](#cdn-install-via-bundlerun)   | [learn to install and use here](#cdn-install-via-bundlerun)   |
| Skypack             | CDN        | Kind of complex, components not working, for people who like complex cdns (Browser)                        | [learn to install and use here](#cdn-install-via-skypack)     | [learn to install and use here](#cdn-install-via-skypack)     |
| Npm module          | module     | For usage in node js projects (node js projects, browser[kind of])                                         | [learn to install and use here](#npm-module-available-at-npm) | [learn to install and use here](#npm-module-available-at-npm) |
| Deno module         | module     | For usage in deno projects (deno projects)                                                                 | [learn to install here](#for-deno)                            | [Learn to use here](#usage-for-all-of-the-above)              |

### CDN Install (via jsdeliver)

***Simplest Install***

```html
<!--For Development-->
<script src="https://cdn.jsdelivr.net/gh/imagineeeinc/orbs-js/src/orbs.js"></script>

<!--For production(recommended for speed)-->
<script src="https://cdn.jsdelivr.net/gh/imagineeeinc/orbs-js/src/orbs.min.js"></script>

<!--For official components provided-->
<script src="https://cdn.jsdelivr.net/gh/imagineeeinc/orbs-js/src/orbs.components.js"></script>
<!--Minified-->
<script src="https://cdn.jsdelivr.net/gh/imagineeeinc/orbs-js/src/orbs.components.min.js"></script>
```

### CDN Install (via unpkg)

```html
<!--for the js file-->
<!--Recomended for browser-->
<script src="https://unpkg.com/orbs-js@1.3.1/src/orbs.js" />

<!--components-->
<script src="https://unpkg.com/orbs-js@1.3.1/src/orbs.components.js" />

<!--for npm file-->
<script src="https://unpkg.com/orbs-js@1.3.1/npm/orbs.js" />
```

### Download

Simply download any of the files bellow and include in your project

- [Core Engine](https://raw.githubusercontent.com/imagineeeinc/orbs-js/main/src/orbs.js)
- [Core Engine (minified)](https://raw.githubusercontent.com/imagineeeinc/orbs-js/main/src/orbs.min.js)
- [Components](https://raw.githubusercontent.com/imagineeeinc/orbs-js/main/src/orbs.components.js)
- [Component (minified)](https://raw.githubusercontent.com/imagineeeinc/orbs-js/main/src/orbs.components.min.js)

<br>

__Add any of these to the head of the html depending on what you need__

### Usage (for all of the above)

__To import in JavaScript (and deno)__

use the import variables like this:

```js
// swap the values in the currly braces for what you need to import
// make sure to use the orbsCore to import from, or it won't work
const {ORBS, update, mesh, rect, circle, Vect, customMesh, lineRndr, down, sprite, text, plainText} = orbsCore

// This is all you need for components (make sure the libary is imported in the head of the documnet)
const {components} = orbsComponents
```

NOTE: do not import the files straight into your js file, you have to include it in the head of your html.

### CDN Install (via Bundle.run)

__This is one of the efficient yet easy way__

```html
<!--add this to your head-->
<script src="https://bundle.run/orbs-js@1.3.2"></script>
```

easily import in your js with this:

```js
// Import 'orbsCore' and 'components' if needed from 'orbsJs'
// make sure to include the bunde.run url in the head
const {orbsCore, components} = orbsJs

// swap the values in the currly braces for what you need to import
const {ORBS, update, mesh, rect, Vect, down} = orbsCore

// use components how you would like 'components.whatComponentNeeded()'
```

### CDN Install (via skypack)

__Use import like this in your js__

```js
import orbsJs from 'https://cdn.skypack.dev/orbs-js';
```

__And Import the the functions and values like this__

```js
// swap the values in the currly braces for what you need to import
const {ORBS, update, mesh, rect, Vect, down} = orbsJs

// Components dosen't seem to work with skypack currently so use one off the other options from before.
```

full example for skypack:

```js
// importing the orbs js libary from skypack
import orbsJs from 'https://cdn.skypack.dev/orbs-js/';

// swap the values in the currly braces for what you need to import
const {ORBS, update, mesh, rect, Vect, down} = orbsJs
```

### Npm Module available at [npm](https://www.npmjs.com/package/orbs-js)

install using the bellow in the command line to add to your project.

```bash
# npm
npm i orbs-js

# yarn
yarn add orbs-js
```

__Usage in your js file__

```js
// use the 'orbsCore' to import the main liabry and 'components' import the components
const {orbsCore, components} = require('orbs-js')

// swap the values in the currly braces for what you need to import
const {ORBS, update, mesh, rect, Vect, down} = orbsCore

// use components how you would like 'components.whatComponentNeeded()'
```

### For Deno

if you are looking for deno you can use the skypack url: `https://cdn.skypack.dev/orbs-js?dts`. for skypack usage go [here](#cdn-install-via-skypack)

Or the deno.land/x package:

- [Core Engine](https://deno.land/x/orbs_js/orbs.js)
- [Core Engine (minified)](https://deno.land/x/orbs_js/orbs.min.js)
- [components](https://deno.land/x/orbs_js/orbs.components.js)
- [components (minified)](https://deno.land/x/orbs_js/orbs.components.min.js)
  [usage for deno.land x package](#usage-for-all-of-the-above)

## Demos

- [html test use to test (github)](https://github.com/imagineeeinc/orbs-js/blob/main/test/index.html)
- [npm module test using jest (github)](https://github.com/imagineeeinc/orbs-js/blob/main/test/test_npm.test.js)
- [html test used to test (live)](https://imagineeeinc.github.io/orbs-js/test/)
- Example for v1.3.0 on [jsfiddle](https://jsfiddle.net/Imagineee/1pzmrjLt/26/)
- Example for v1.3.1 and above on [codepen](https://codepen.io/imagineeeinc/pen/abWYjLN)

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
rects.vars({x: 50, y: 50, width: 100, height: 100, color: "pink"})
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

# The Revamp

A revamp will be coming to the orbs JS engine that will simplify the creation of content as it seems to complicated to get a simple square moving on the screen. This new revamp will throw the previous project paradigm out the windows in favour for a simpler declarative method of just calling functions. This can also reduce the bundle size quite a bit, but this is the revamp of the project structure and ~~not the rendering engine~~ A fancy new simplified rendering engine called [MayoGL](https://github.com/imagineeeinc/MayoGL), remember that, this also allows for more customizability of the project. The idea of the revamp also comes from [Kaboom JS](https://kaboomjs.com/), so do check it out.

Sorry for no docs for pre-v1.4.0 (so, after the update you have to look at the source code to understand how to use the pre-1.4.0, but I don't think its needed as the newer one will be far more efficient on time.), but as soon as the 1.05.0 releases with the new system there will be (I hate writing docs)

## License

This content is released under the [MIT License](http://opensource.org/licenses/MIT).
