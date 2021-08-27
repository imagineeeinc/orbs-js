/**
 * @typedef {Object} CaveRendererOption
 * @property {JSON} bgColor - background colour
 * @property {JSON} canvasId - the canvasId
 */

/**
 * A Rendering Engine that can be used render to canvas
 * @param {CaveRendererOptions} options - {@link CaveRendererOption} object
 * containing all components for rendering
 * @returns {renderer}
 */
class CaveRenderEngine {
  constructor(opts) {
    this.bgColor = opts.bgColor;
    this.canvasId = opts.canvasId;
    this._drawers = this._theDrawers();
    this.campos = [0, 0];
    this.lastUpdate = null;
    this.deltaTime = 0;
    this.noUpdate = {};
  }
  setUpImageCacher() {
    let store = document.createElement("div");
    store.style.display = "none";
    store.id =
      "caveImageCache" + Math.round(Math.floor(Math.random() * 9999) + 1000);
    document.body.append(store);
    return store.id;
  }
  zeroToCenter(is) {
    let canvas = document.getElementById(this.canvasId);
    if (canvas.getContext) {
      var ctx = canvas.getContext("2d");
    } else {
      return [false, error.noSupport];
    }
    if (is === true) {
      ctx.translate(canvas.width / 2, canvas.height / 2);
    } else if (is === false) {
      ctx.translate(0, 0);
    } else {
      return [false, "no given boolen"];
    }
  }
  draw(scene,fps,antiAliasing,campos,imgStore,shader,renderer,canvasObj,beforeRender,afterRender,keyboardEvent) {
    if (this.lastUpdate == null) {
      this.lastUpdate = Date.now();
    }
    let now = Date.now();
    this.fps = fps;
    this.scene = scene;
    let canvas = canvasObj() || document.getElementById(this.canvasId);
    if (canvas.getContext) {
      var ctx = canvas.getContext("2d", { alpha: false });
    } else {
      return [false, error.noSupport];
    }
    //TODO: on events system, key events
    beforeRender({
      scene,
      fps,
      antiAliasing,
      campos,
      imgStore,
      shader,
      renderer,
      canvasObj,
    });
    let key = keyboardEvent.event.keyStroke;
    keyboardEvent.callback({
      key,
      event: keyboardEvent.event,
      delta: this.deltaTime,
      scene,
      onDirection: (arrow) => {
        let k = keyEvent(key);
        if (k.indexOf(left) > -1 && arrow == left) {
          return true;
        } else if (k.indexOf(right) > -1 && arrow == right) {
          return true;
        } else if (k.indexOf(down) > -1 && arrow == down) {
          return true;
        } else if (k.indexOf(up) > -1 && arrow == up) {
          return true;
        } else if (k.indexOf("a") > -1 && arrow == left) {
          return true;
        } else if (k.indexOf("d") > -1 && arrow == right) {
          return true;
        } else if (k.indexOf("s") > -1 && arrow == down) {
          return true;
        } else if (k.indexOf("w") > -1 && arrow == up) {
          return true;
        } else {
          return false;
        }
      },
    });
    //defaults
    ctx.font = defaultFont;
    ctx.imageSmoothingEnabled = antiAliasing;
    //background render code
    ctx.fillStyle = this.bgColor;
    ctx.clearRect(-50, -50, canvas.width + 100, canvas.height + 100);
    ctx.fillRect(-50, -50, canvas.width + 100, canvas.height + 100);
    let ccampos = [campos.x, campos.y];
    if (ccampos[0] != this.campos[0] || ccampos[1] != this.campos[1]) {
      ctx.translate(ccampos[0] - this.campos[0], ccampos[1] - this.campos[1]);
      this.campos = ccampos;
    }
    //shaders
    if (shader != null || shader != undefined) {
      shader(ctx, { fps: this.fps, screen: canvas, camera: this.campos });
    }
    for (var i = 0; i < this.scene.vScene.length; i++) {
      let obj = scene.vScene[i];
      //collisions
      if (obj.collisionLayer) {
        if (scene.layers.collision[obj.collisionLayer]) {
          //TODO: circle hitbox
          if (obj.hitbox.shape == rect) {
            var rect1 = {
              x: obj.x - (obj.width * obj.scale) / 2 + obj.hitbox.center[0],
              y: obj.y - (obj.height * obj.scale) / 2 + obj.hitbox.center[1],
              width: obj.hitbox.width,
              height: obj.hitbox.height,
            };
            obj.collision = [];
            for (
              let num = 0;
              num < scene.layers.collision[obj.collisionLayer].length;
              num++
            ) {
              let curObj = scene.getObj(
                scene.layers.collision[obj.collisionLayer][num]
              );
              if (curObj.name != obj.name) {
                if (curObj.hitbox.shape == rect) {
                  let rect2 = {x:curObj.x -(curObj.width * curObj.scale) / 2 +curObj.hitbox.center[0],y:curObj.y -(curObj.height * curObj.scale) / 2 +curObj.hitbox.center[1],width: curObj.hitbox.width,height: curObj.hitbox.height,};
                  //Left
                  if (
                    rect1.x < rect2.x + rect2.width/4 &&
                    rect1.x + rect1.width > rect2.x &&
                    rect1.x + rect1.width < rect2.x + rect2.width/4 &&
                    rect1.y < rect2.y + rect2.height &&
                    rect1.y + rect1.height > rect2.y &&
                    !(rect1.x == rect2.x)
                  ) {
                    obj.collision.push(left);
                    if (obj.collideReact == true) {
                      obj.x -= rect1.x+rect1.width-rect2.x
                    }
                  }
                  //Right
                  if (
                    rect1.x > rect2.x + rect2.width*0.75 &&
                    rect1.x + rect1.width > rect2.x + rect2.width &&
                    rect1.x < rect2.x + rect2.width &&
                    rect1.y < rect2.y + rect2.height &&
                    rect1.y + rect1.height > rect2.y &&
                    !(rect1.x == rect2.x)
                  ) {
                    obj.collision.push(right);
                    if (obj.collideReact == true) {
                      obj.x += rect2.x+rect2.width-rect1.x
                    }
                  }
                  //Top
                  if (
                    rect1.y < rect2.y + rect2.height / 2 &&
                    rect1.y + rect1.height > rect2.y &&
                    rect1.y + rect1.height < rect2.y + rect2.height/4 &&
                    rect1.x < rect2.x + rect2.width &&
                    rect1.x + rect1.width > rect2.x &&
                    !(rect1.y == rect2.y)
                  ) {
                    obj.collision.push(up);
                    if (obj.collideReact == true) {
                      obj.y -= rect1.y+rect1.height-rect2.y
                    }
                  }
                  //Bottom
                  if (
                    rect1.y > rect2.y + rect2.height*0.75 &&
                    rect1.y + rect1.height > rect2.y + rect2.height &&
                    rect1.y < rect2.y + rect2.height &&
                    rect1.x < rect2.x + rect2.width &&
                    rect1.x + rect1.width > rect2.x &&
                    !(rect1.y == rect2.y)
                  ) {
                    obj.collision.push(down);
                    if (obj.collideReact == true) {
                      obj.y += rect2.y+rect2.height-rect1.y
                    }
                  }
                }
              }
            }
          }
        }
      }
      //scripts
      if (obj.scripts != null) {
        let sc = obj.scripts;
        let res;
        for (var j = 0; j < sc.length; j++) {
          let importing =
            sc[j].importScript ||
            function () {
              return null;
            };
          let s = sc[j].script;
          importing = importing();
          res = s(obj, importing, {fps: this.fps,delta: this.deltaTime,screen: canvas,camera: this.campos,renderer: renderer,
          });
        }
      }
      // move scripts
      if (obj.dx || obj.dy) {
        if (obj.dx) {
          obj.x += obj.dx;
        }
        if (obj.dy) {
          obj.y += obj.dy;
        }
      }
      //drawing
      if (obj.type == mesh) {
        if (obj.drawType == rect) {
          let response = this._drawers.rect(ctx, [
            obj.x - (obj.width * obj.scale) / 2,
            obj.y - (obj.height * obj.scale) / 2,
            obj.width * obj.scale,
            obj.height * obj.scale,
            obj.color,
          ]);
        } else if (obj.drawType == circle) {
          let response = this._drawers.circle(ctx, [
            obj.x - (obj.width * obj.scale) / 2,
            obj.y - (obj.height * obj.scale) / 2,
            obj.width * obj.scale,
            obj.color,
          ]);
        }
      } else if (obj.type == sprite) {
        if (obj.drawType == texture) {
          let response = this._drawers.texture(ctx, [
            obj.x - (obj.width * obj.scale) / 2,
            obj.y - (obj.height * obj.scale) / 2,
            obj.width * obj.scale,
            obj.height * obj.scale,
            obj.sprite,
          ]);
        }
      } else if (obj.type == text) {
        if (obj.drawType == plainText) {
          let response = this._drawers.plainText(ctx, [
            obj.x - (obj.width * obj.scale) / 2,
            obj.y - (obj.height * obj.scale) / 2,
            obj.txt,
            obj.font,
            obj.color,
          ]);
        }
      } else if (obj.type == line) {
        let response = this._drawers.lineRndr(ctx, [
          obj.start,
          obj.end,
          obj.width,
          obj.color,
        ]);
      } else if (obj.type == customMesh) {
        let response = this._drawers.customMesh(
          ctx,
          obj.meshShader,
          {
            fps: this.fps,
            delta: this.deltaTime,
            screen: canvas,
            camera: this.campos,
            renderer: renderer,
          },
          obj.meshShader.importScript ||
            function () {
              return null;
            }
        );
      }
    }
    let dt = now - this.lastUpdate;
    this.lastUpdate = now;
    this.deltaTime = dt / 100;
    afterRender({
      scene,
      fps,
      antiAliasing,
      campos,
      imgStore,
      shader,
      renderer,
      canvasObj,
    });
    return [true];
  }
  _theDrawers() {
    let drawers = {
      rect: function (ctx, opts) {
        ctx.fillStyle = opts[4];
        ctx.fillRect(opts[0], opts[1], opts[2], opts[3]);
        return true;
      },
      circle: function (ctx, opts) {
        ctx.beginPath();
        ctx.arc(opts[0], opts[1], opts[2], 0, 2 * Math.PI);
        ctx.fillStyle = opts[3];
        ctx.fill();
        ctx.closePath();
        return true;
      },
      texture: function (ctx, opts) {
        ctx.drawImage(opts[4].img, opts[0], opts[1], opts[2], opts[3]);
        return true;
      },
      plainText: function (ctx, opts) {
        ctx.font = opts[3];
        ctx.fillStyle = opts[4];
        ctx.fillText(opts[2], opts[0], opts[1]);
        return true;
      },
      lineRndr: function (ctx, opts) {
        ctx.strokeStyle = opts[3];
        ctx.lineWidth = opts[2];
        ctx.beginPath();
        if ((opts[0].isVectObj = true)) {
          ctx.moveTo(opts[0].x, opts[0].y);
        } else {
          ctx.moveTo(opts[0][0], opts[0][1]);
        }
        if ((opts[1].isVectObj = true)) {
          ctx.lineTo(opts[1].x, opts[1].y);
        } else {
          ctx.lineTo(opts[1][0], opts[1][1]);
        }
        ctx.stroke();
        return true;
      },
      customMesh: function (ctx, shader, others, imps) {
        let s = shader.script;
        imps = imps();
        s(ctx, imps, others);
        return true;
      },
    };
    return drawers;
  }
}
