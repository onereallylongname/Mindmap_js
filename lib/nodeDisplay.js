class NodeDisplay {

  processeNodes(layer, tree){
    for (var node in tree.nodes) {
      console.log(node, tree.nodes[node]);
      this.processe(layer, tree.nodes[node]);
    }
  }

  processe(layer, node){
    //this["testfunc"]();
    layer.graphics.fill(node.disp.color);
    layer.graphics.ellipse(node.disp.pos.x, node.disp.pos.y, node.disp.r * 1.2, node.disp.r);
  }

  testfunc(){
    console.log("test");
  }

}
