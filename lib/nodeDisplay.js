class NodeDisplay {

  constructor() {

  }

  display(layer, node){
    console.log(layer);
    console.log(node);
    layer.fill(200);
    layer.ellipse(node.disp.pos.x, node.disp.pos.y, 50)
  }


}
