class Display {

  constructor(){
    this.dN = new NodeDisplay();
    this.dL = new LinkDisplay();
  }

  processe(layers, map){
    console.log("Map", map);
    this.processeBG(layer, map.disp.color);

    for (var tree in map.trees) {
      console.log(tree, map.trees[tree]);
      this.dL.processeLinks(layer, map.trees[tree]);
      this.dN.processeNodes(layer, map.trees[tree]);
    }

    this.render(layer)

  }

  processeBG(layer, color){
    layer.graphics.background(color);
  }


  testfunc(){
    console.log("test");
  }

  render(layer){
    image(layer.graphics, layer.pos.x, layer.pos.y);
  }

}
