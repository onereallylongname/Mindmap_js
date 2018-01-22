class NodeDisplay {

  processeNodes(layer, tree){
    for (var node in tree.nodes) {
    //  console.log(node, tree.nodes[node]);
      this.processe(layer, tree.nodes[node]);
    }
  }

  processe(layer, node){
    //this["testfunc"]();
    this[node.info.type](layer, node);
  }

  default(layer, node){
    layer.graphics.fill(node.disp.color);
    layer.graphics.ellipse(ME.map.pos.x + (  node.disp.pos.x) * OPTIONS.zoom, ME.map.pos.y + (  node.disp.pos.y) * OPTIONS.zoom, node.disp.size.x * OPTIONS.zoom, node.disp.size.y * OPTIONS.zoom);
  }

  testfunc(){
    console.log("test");
  }

}
