// Handles the global configurations

const MODES_OF_USE = ["default", "drag", "add"];
const MOUSE_MODES_OF_USE = ["default", "move", "cell"];
const NODE_SIZE = [70, 50];


class GlobalOptions {

  constructor() {
    this.version = 1.0;
    this.currentID = "";
    this.account = "Test name";
    this.mapName = "New Mindmap";
    this.zoom = 1;
    this.maxZoom = 3;
    this.minZoom = 0.3;

    this.canvasID = "";
    this.canvasOn = false;

    this.mouse = {
      now: {x: 0, y: 0},
      old: {x: 0, y: 0},
    };
    this.mode = {
      now: 0,
      new: null,
      old: 0,
    };
    this.selected = {
      target: "null",
      tree: "null",
      allTree: false,
      allTargets: false,
    };
    this.userOptions = {

    };
  }

  changeZoom(zoomVal){
    this.zoom += zoomVal/2400;
    this.zoom = constrain(this.zoom, this.minZoom, this.maxZoom);
  }

  updateMode(){
    if( this.mode.new != null){
      this.mode.now = this.mode.new;
      this.mode.new = null;

    }
  }

  setMode(newMode){
    this.mode.old = this.mode.now;
    this.mode.new = newMode;
    this.updateMode();
  }

  resetMode(){
    this.mode.new = this.mode.old;
    this.mode.old = this.mode.now;
    this.updateMode();
  }

  enableMode(n) {
    if (this.mode.now == n) {
      this.resetMode();
    } else {
      this.setMode(n);
    }
    DSP.map(ML.map, ME.map);
  }

  setMousePos(pos){
    this.mouse.old = this.mouse.now;
    this.mouse.now = pos;
  }

  mouseDrag(pos){
    this.setMousePos(pos);
    let dif = {x: 0, y: 0};
    dif.x = this.mouse.now.x - this.mouse.old.x;
    dif.y = this.mouse.now.y - this.mouse.old.y;
    return dif;
  }

}
