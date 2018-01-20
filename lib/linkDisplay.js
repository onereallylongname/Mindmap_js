class LinkDisplay {

  constructor(){
    this.tempTree = Maptree(null);
  }

  processeLinks(layer, tree){
    this.tempTree = tree;
    for (var link in tree.links) {
    //  console.log(link, tree.links[link]);
      this.processe(layer, tree.links[link]);
    }
    this.tempTree = Maptree(null);
  }

  processe(layer, link){
    layer.graphics.fill(link.disp.color);
    layer.graphics.strokeWeight(link.disp.stroke * OPTIONS.zoom);
    layer.graphics.line(this.tempTree.nodes[link.from].disp.pos.x * OPTIONS.zoom, this.tempTree.nodes[link.from].disp.pos.y * OPTIONS.zoom,  this.tempTree.nodes[link.to].disp.pos.x * OPTIONS.zoom,  this.tempTree.nodes[link.to].disp.pos.y * OPTIONS.zoom);

  }

  testfunc(){
    console.log("test");
  }

}
