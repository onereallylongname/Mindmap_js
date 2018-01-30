// Contains the map and the functions to operate on a map
// max num nodos or links or trees = 262143 -> "---" base64    --  so ids have left padding 3
// max map id = 10000000000 -> "1K2+G0" base64  -- so ids have left padding 6


class MapEditor {

  constructor() {
    this.changeTracker = [];
    this.map = {};
  }

  newMap() {
    return Mapmap(OPTIONS.version, B64.fromInt(Math.random() * 10000000000) , {x: [0, CANVAS_X], y: [0, CANVAS_Y]})
  }

  newTree(type) {
    if (type === undefined) {
      type = "default";
    }
    let idVal = Object.keys(this.map.trees).length;
    idVal = B64.fromInt(idVal);
    this.map.trees[idVal] = Maptree(idVal, "Tree " + idVal, type);
    return idVal;
  }

  deleteTree(tree){
    if(this.map.trees[tree] != undefined){
      console.log(this.map.trees[tree]);
      delete this.map.trees[tree];
      console.log(this.map.trees[tree]);
    }
  }

  newNode(tree, posX, posY ){
    if (this.map.trees[tree] == null) {
      alert("Tree " + tree + " does not exist");
      return;
    }
    let numCurrentNodes = Object.keys(this.map.trees[tree].nodes).length;
    //console.log(numCurrentNodes);
    let newID =  B64.fromInt(numCurrentNodes);
    //console.log(newID);
    let growFactor = 2;
     let newX = this.changeCoords(OPTIONS.zoom, this.map.pos.x, posX);
     let newY = this.changeCoords(OPTIONS.zoom, this.map.pos.y, posY);
     let newW = NODE_SIZE[0] * OPTIONS.zoom / 2;
     let newH = NODE_SIZE[1] * OPTIONS.zoom / 2;
    // if(!COL.circleOnRect(posX, posY, max(newW, newH)/2, this.mapCurrentSize("minX"), this.mapCurrentSize("maxX"), this.mapCurrentSize("minY"), this.mapCurrentSize("maxY"))) {

       if (posX - newW < this.mapCurrentSize("minX")) {
         this.map.size.x[0] = (posX - this.map.pos.x) / OPTIONS.zoom - growFactor * NODE_SIZE[0];
       }
       if (posX + newW > this.mapCurrentSize("maxX")) {
         this.map.size.x[1] = (posX - this.map.pos.x) / OPTIONS.zoom + growFactor * NODE_SIZE[0];
       }

       if (posY - newH < this.mapCurrentSize("minY")) {
         this.map.size.y[0] = (posY - this.map.pos.y) / OPTIONS.zoom - growFactor * NODE_SIZE[1];
       }
       if (posY + newH > this.mapCurrentSize("maxY")) {
         this.map.size.y[1] = (posY - this.map.pos.y) / OPTIONS.zoom + growFactor * NODE_SIZE[1];
       }

     //}
     // Mapnode(pos, id, type = "default")
     //
     this.map.trees[tree].nodes[newID] = Mapnode({
       x: newX,
       y: newY,
     }, newID);
  }

  linkNode(){
    // falta !!!!!!!!!!!
  }


  deleteTarget(target, type){
    console.log(this.map.trees[OPTIONS.selected.tree][type][target]);
    if(this.map.trees[OPTIONS.selected.tree][type][target] != undefined){
      delete this.map.trees[OPTIONS.selected.tree][type][target];
      console.log(this.map.trees[OPTIONS.selected.tree][type][target]);
    }
  }

  move(amount) {
    this.map.pos.x += amount.x; // * (1 / OPTIONS.zoom);
    this.map.pos.x = constrain(this.map.pos.x, -0.2 * CANVAS_X - this.map.size.x[1] * OPTIONS.zoom, CANVAS_X * 1.2 - this.map.size.x[0] * OPTIONS.zoom);
    this.map.pos.y += amount.y; // * (1 / OPTIONS.zoom);
    this.map.pos.y = constrain(this.map.pos.y, -0.2 * CANVAS_Y - this.map.size.y[1] * OPTIONS.zoom, CANVAS_Y * 1.2 - this.map.size.y[0] * OPTIONS.zoom);
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

  mapCurrentSize(side){
    switch (side) {
      case "minX":
        return this.map.pos.x + this.map.size.x[0] * OPTIONS.zoom;
      break;
      case "maxX":
        return this.map.pos.x + this.map.size.x[1] * OPTIONS.zoom;
      break;
      case "minY":
        return this.map.pos.y + this.map.size.y[0] * OPTIONS.zoom;
      break;
      case "maxY":
        return this.map.pos.y + this.map.size.y[1] * OPTIONS.zoom;
      break;
    }
  }

  testfunc() {
    console.log("test");
  }

}
