class NodeDisplay {

  processeNodes(layer, nodes){
    for (var i = 0; i < nodes.length; i++) {
      processe(layer, nodes[i]);
    }
  }

  processe(layer, node){
    console.log(layer);
    console.log(node);
    layer.graphics.fill(200);
    layer.graphics.ellipse(node.disp.pos.x, node.disp.pos.y, 50)
  }

  render(layer){
    image(layer.graphics, layer.pos.x, layer.pos.y)
  }

}
