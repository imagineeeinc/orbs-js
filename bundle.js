const fs = require('fs')

const values = fs.readFileSync('./core/values.js', 'utf8')
const caveRenderEngine = fs.readFileSync('./core/caveRenderEngine.js', 'utf8')
const newOrbsScene = fs.readFileSync('./core/newOrbsScene.js', 'utf8')
const newOrbsRenderer = fs.readFileSync('./core/newOrbsRenderer.js', 'utf8')
const newOrbsObj = fs.readFileSync('./core/newOrbsObj.js', 'utf8')
const extraFunc = fs.readFileSync('./core/extraFunc.js', 'utf8')

var bundled = fs.readFileSync('./core/@template.js', 'utf8')

bundled = bundled
.replace('{{{values}}}', values)
.replace('{{{caveRenderEngine}}}', caveRenderEngine)
.replace('{{{newOrbsScene}}}', newOrbsScene)
.replace('{{{newOrbsRenderer}}}', newOrbsRenderer)
.replace('{{{newOrbsObj}}}',newOrbsObj)
.replace('{{{extraFunc}}}', extraFunc)
let loc = './src/orbs.js'
fs.writeFile(loc, bundled, (err)=>{if(err){console.log(`> ${err}`)}else{console.log(`> Bundled Orbs JS to a bundled File\n> @ ${loc}`)}})