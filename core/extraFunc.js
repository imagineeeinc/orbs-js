class newOrbsScriptComponent {
  constructor(sc) {
    this.script =
      sc ||
      function () {
        return null;
      };
  }
  attachScript(s) {
    this.script = s;
  }
  imports(im) {
    this.importScript = im;
  }
}
class Vector {
  constructor(x, y, scale, rotation) {
    this.isVectObj = true;
    this.x = x || null;
    this.y = y || null;
    this.scale = scale || null;
    this.rot = rotation || null;
  }
  _giveVector() {
    return [this.x, this.y, this.scale, this.rot];
  }
}
class newOrbsImage {
  constructor(url, name) {
    this.isImgObj = true;
    let image = new Image();
    image.src = url;
    this.img = image;
    this.name = name;
    this.url = url;
  }
}
function keyEvent(key) {
  return key.split("+");
}
exports.ORBS = {
  setFullScreenGameCss: function () {
    document.body.setAttribute(
      "style",
      `padding: 0;
		margin: 0;
		height: 100vh`
    );
  },
  _: function () {
    return [new newOrbsRenderer(), new newOrbsScene()];
  },
  keyEvent: keyEvent,
  renderer: newOrbsRenderer,
  scene: newOrbsScene,
  obj: newOrbsObj,
  scriptComponent: newOrbsScriptComponent,
  Vector: Vector,
  Sprite: newOrbsImage,
  Image: newOrbsImage,
  Texture: newOrbsImage,
};

function array_move(arr, old_index, new_index) {
	if (new_index >= arr.length) {
			var k = new_index - arr.length + 1;
			while (k--) {
					arr.push(undefined);
			}
	}
	arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
	return arr; // for testing
}
function Vect(x, y, s, r) {
	return new Vector(x, y, s, r)
}