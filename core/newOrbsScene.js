class newOrbsScene {
  constructor() {
    this.vScene = [];
    this.layers = {};
    this.layers.collision = {};
  }
  add(obj) {
    this.vScene.push(obj);
    if (obj.collisionLayer) {
      if (scene.layers.collision[obj.collisionLayer]) {
        scene.layers.collision[obj.collisionLayer].push(obj.name);
      }
    }
  }
  scene() {
    return this.vScene;
  }
  moveObj(old, newI) {
    this.vScene = array_move(this.vScene, old, newI);
  }
  getObj(name) {
    for (var i = 0; i < this.vScene.length; i++) {
      if (this.vScene[i].name == name) {
        return this.vScene[i];
      }
    }
  }
  exportSelf() {
    return this;
  }
  collisionLayerSet(name) {
    this.layers.collision[name] = [];
  }
}
