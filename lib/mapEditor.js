// Contains the map and the functions to operate on a map
class MapEditor {

  constructor() {
    this.changeTracker = [];
    this.map = {};
  }

  newMap() {
    return Mapmap(OPTIONS.version, B64.fromInt(Math.random() * 10000000000))
  }

  move(amount) {
    this.map.pos.x += amount.x; // * (1 / OPTIONS.zoom);
    this.map.pos.y += amount.y; // * (1 / OPTIONS.zoom);
  }

  zoom(zoomVal, cx, cy) {
    let dx = this.changeCoords(zoomVal, this.map.pos.x, cx) * (this.map.zoom - zoomVal);
    let dy = this.changeCoords(zoomVal, this.map.pos.y, cy) * (this.map.zoom - zoomVal);
    this.move({x: dx, y: dy});
    console.log(dx);
    console.log(this.map.pos);
    this.map.zoom = zoomVal;
  }

  changeCoords(zoom, mapCoord, coord) {
    return (coord - mapCoord)/zoom;
  }

  testfunc() {
    console.log("test");
  }

}
