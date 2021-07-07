const fs = require('fs')
var window
eval(fs.readFileSync(__dirname+'/../src/orbs.js', 'utf8')
.replace(`window.onOrbsLoad = () => null
setTimeout(() => {window.onOrbsLoad()}, 30)`, "")
.replaceAll('const ', 'global.')
.replaceAll('window.', 'global.'))
eval(fs.readFileSync(__dirname+'/../src/orbs.components.js', 'utf8')
.replace(`window.onOrbsLoad = () => null
setTimeout(() => {window.onOrbsLoad()}, 30)`, "")
.replaceAll('const ', 'global.')
.replaceAll('window.', 'global.'))
module.exports = {
	ORBS, still, update, mesh, customMesh, canvasShape, sprite, lineRndr, line, text,
	texture, rect, circle, paths, plainText, hitbox, down, up, drag , defaultFont, error,
	Vect, orbComponents
}