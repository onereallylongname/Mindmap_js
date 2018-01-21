// Handles the graphics and rendering of the layers
class Display {

  constructor(){
    this.dN = new NodeDisplay();
    this.dL = new LinkDisplay();
  }

  map(layer, map){
  //  console.log("Map", map);
    this.processeBG(layer, map.disp.color);

layer.graphics.fill("#FFFFFF");
    layer.graphics.rect(map.pos.x, map.pos.y , CANVAS_X * OPTIONS.zoom, CANVAS_Y * OPTIONS.zoom);
    for (var tree in map.trees) {
    //  console.log(tree, map.trees[tree]);
      this.dL.processeLinks(layer, map.trees[tree]);
      this.dN.processeNodes(layer, map.trees[tree]);
    }

    layer.graphics.ellipse( map.pos.x + ( mouseX) * OPTIONS.zoom,  map.pos.y + ( mouseY) * OPTIONS.zoom , 5);
    let txt = Math.round(mouseX).toString() + " , " + Math.round(mouseY).toString();

    layer.graphics.text(txt, mouseX + 4, mouseY - 4);

txt = Math.round(map.pos.x).toString() + " , " + Math.round(map.pos.y).toString();
layer.graphics.text(txt, map.pos.x + 4, map.pos.y - 4);


layer.graphics.ellipse(CANVAS_X/2, CANVAS_Y/2, 10);
layer.graphics.ellipse(map.pos.x + CANVAS_X * OPTIONS.zoom/2, map.pos.y + CANVAS_Y * OPTIONS.zoom/2, 10);

    this.render(layer)

  }

  ui(layer, ui){
    console.log("Does Nothing!!");
  }


  processeBG(layer, color){
    background(5);
    layer.graphics.background(color);
  }


  testfunc(){
    console.log("test");
  }

  render(layer){
    image(layer.graphics, layer.pos.x, layer.pos.y);
  }

}
