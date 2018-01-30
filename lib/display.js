// Handles the graphics and rendering of the layers
class Display {

  constructor() {
    this.dN = new NodeDisplay();
    this.dL = new LinkDisplay();
  }

  map(layer, map) {
    //  console.log("Map", map);
    this.processeBG(layer, map.disp.color);

    this.debugFunc1(layer, map);
    for (var tree in map.trees) {
      this.dL.processeLinks(layer, map.trees[tree]);
      this.dN.processeNodes(layer, map.trees[tree]);
    }

    if(!OPTIONS.selected.allTree && map.trees[OPTIONS.selected.tree] != undefined){
      layer.graphics.background(255, 40);
      this.dL.processeLinks(layer, map.trees[OPTIONS.selected.tree]);
      this.dN.processeNodes(layer, map.trees[OPTIONS.selected.tree]);
    }

    this.debugFunc2(layer, map);


    this.render(layer)

  }

  ui(layer, ui) {
    console.log("Does Nothing!!");
  }


  processeBG(layer, color) {
    background(5);
    layer.graphics.background(color);
  }


  debugFunc1(layer, map) {
    layer.graphics.fill("#FFFFFF");
    layer.graphics.rect(map.pos.x + map.size.x[0] * OPTIONS.zoom, map.pos.y + map.size.y[0] * OPTIONS.zoom,  (map.size.x[1] - map.size.x[0]) * OPTIONS.zoom, (map.size.y[1] - map.size.y[0]) * OPTIONS.zoom);
    layer.graphics.ellipse(ME.mapCurrentSize("minX"), ME.mapCurrentSize("minY"), 5);
    layer.graphics.ellipse(ME.mapCurrentSize("maxX"), ME.mapCurrentSize("maxY"), 5);
    layer.graphics.ellipse(ME.map.pos.x, ME.map.pos.y, 5);
  }

  debugFunc2(layer, map) {
    layer.graphics.ellipse(map.pos.x + (mouseX) * OPTIONS.zoom, map.pos.y + (mouseY) * OPTIONS.zoom, 5);
    let txt = Math.round(mouseX).toString() + " , " + Math.round(mouseY).toString();

    layer.graphics.text(txt, mouseX + 4, mouseY - 4);

    txt = Math.round(map.pos.x).toString() + " , " + Math.round(map.pos.y).toString();
    layer.graphics.text(txt, map.pos.x + 4, map.pos.y - 4);

    layer.graphics.push();
    let centerx = CANVAS_X / 2;
    let centery = CANVAS_Y / 2;
    layer.graphics.strokeWeight(2);
    layer.graphics.stroke('rgba(50,50,50,0.08)');
    layer.graphics.line(centerx -8, centery, centerx + 8 , centery);
    layer.graphics.line(centerx , centery -8, centerx  , centery + 8);
    layer.graphics.pop();
    layer.graphics.ellipse(map.pos.x + CANVAS_X * OPTIONS.zoom / 2, map.pos.y + CANVAS_Y * OPTIONS.zoom / 2, 10);
  }

  testfunc() {
    console.log("test");
  }

  render(layer) {
    image(layer.graphics, layer.pos.x, layer.pos.y);
  }

}
