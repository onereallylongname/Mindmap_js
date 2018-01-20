// Handles the global configurations

const MODES_OF_USE = ["default", "drag"];
const MOUSE_MODES_OF_USE = ["default", "move"];


class GlobalOptions {

  constructor() {
    this.version = 1.0;
    this.currentID = "";
    this.account = "Test name";
    this.zoom = 1;
    this.maxZoom = 3;
    this.minZoom = 0.3;
    this.flags = {
      selected: [],
    };
    this.mouse = {
      now: {x: 0, y: 0},
      old: {x: 0, y: 0},
      dif: {x: 0, y: 0},
    };
    this.mode ={
      now: 0,
      new: null,
      old: 0,
    };
  }

  updateMode(){
    if( this.mode.new != null){
      this.mode.now = this.mode.new;
      this.mode.new = null;
      cursor(MOUSE_MODES_OF_USE[this.mode.now]);
    }

  }

  setMode(newMode){
    this.mode.old = this.mode.now;
    this.mode.new = newMode;
  }

  resetMode(){
    this.mode.new = this.mode.old;
    this.mode.old = this.mode.now;
  }

  setMousePos(pos){
    this.mouse.old = this.mouse.now;
    this.mouse.now = pos;
  }

  mouseDrag(pos){
    this.setMousePos(pos);
    this.mouse.dif.x = this.mouse.now.x - this.mouse.old.x;
    this.mouse.dif.y = this.mouse.now.y - this.mouse.old.y;
    return this.mouse.dif;
  }

}
