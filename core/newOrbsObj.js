class newOrbsObj {
  constructor(opts) {
    this.name =
      opts.name || Math.round(Math.floor(Math.random() * 9999) + 1000);
    this.type = opts.type || mesh;
    if (this.type == mesh) {
      this.drawType = opts.drawType;
    }
    this.drawType = opts.drawType || texture;
    if (this.type == line || this.type == customMesh) {
      this.drawType = null;
    }
    this.scripts = [];
    this.x = opts.x || 0;
    this.y = opts.y || 0;
    this.width = opts.width || 0;
    this.height = opts.height || 0;
    this.color = opts.color || "#000";
    this.scale = opts.scale || 1;
    this.rotation = opts.rotation || 0;
    this.texture = null;
    if (opts.vars) {
      this.vars(opts.vars);
    }
    this.events = {
      mouse: {
        hover: false,
        primaryBtn: up,
        drag: false,
      },
    };
  }
  _giveCodec() {
    return {
      type: this.type,
      drawType: this.drawType,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      color: this.color,
    };
  }
  attachScript(s) {
    this.scripts.push(s);
  }
  setVars(name, value) {
    this[name] = value;
  }
  vars(opts) {
    //TODO: set circle form width to radius and also in render
    for (let i = 0; i < Object.keys(opts).length; i++) {
      this[Object.keys(opts)[i]] = opts[Object.keys(opts)[i]];
    }
  }
  move(v) {
    let vect = v._giveVector();
    this.x = this.x + vect[0] || this.x;
    this.y = this.y + vect[1] || this.y;
    this.scale = this.scale + vect[2] || this.scale;
    this.rotation = this.rotation + vect[3] || this.rotation;
  }
  setPos(v) {
    let vect = v._giveVector();
    this.x = vect[0] || this.x;
    this.y = vect[1] || this.y;
    this.scale = vect[2] || this.scale;
    this.rotation = vect[3] || this.rotation;
  }
  getColide(side) {
    if (side == up || side == top) {
      if (this.collision.indexOf(up) > -1) {
        return true;
      } else {
        return false;
      }
    }
    if (side == down || side == bottom) {
      if (this.collision.indexOf(down) > -1) {
        return true;
      } else {
        return false;
      }
    }
    if (side == left) {
      if (this.collision.indexOf(left) > -1) {
        return true;
      } else {
        return false;
      }
    }
    if (side == right) {
      if (this.collision.indexOf(right) > -1) {
        return true;
      } else {
        return false;
      }
    }
    if (!side) {
      if (this.collision.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  }
  exportSelf() {
    return JSON.parse(JSON.stringify(this));
  }
}
