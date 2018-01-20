// Contains the map and the functions to operate on a map
class MapEditor {

  constructor() {
    this.changeTracker = [];
    this.map = {};
  }

  newMap(){
    return Mapmap( OPTIONS.version, B64.fromInt(Math.random() * 10000000000))
  }

  move(map, amount){
    map.pos.x += amount.x * (1 / OPTIONS.zoom);
    map.pos.y += amount.y * (1 / OPTIONS.zoom);
  }

  zoom(zoomVal, cx, cy){
    if(this.map.zoom + zoomVal > this.map.zoom){
      this.map.pos.x -= (cx) * zoomVal - cx;
      console.log(this.map.zoom, this.map.zoom + zoomVal); //// not working!!!!!!!!!!!!!!!
    }
  }

  testfunc(){
    console.log("test");
  }

}
