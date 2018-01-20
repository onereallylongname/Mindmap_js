class NodeDisplay {

  processeNodes(layer, tree){
    for (var node in tree.nodes) {
    //  console.log(node, tree.nodes[node]);
      this.processe(layer, tree.nodes[node]);
    }
  }

  processe(layer, node){
    //this["testfunc"]();
    layer.graphics.fill(node.disp.color);
    layer.graphics.ellipse(node.disp.pos.x * OPTIONS.zoom, node.disp.pos.y * OPTIONS.zoom, node.disp.r * 1.2 * OPTIONS.zoom, node.disp.r * OPTIONS.zoom);
  }

  testfunc(){
    console.log("test");
  }

}
