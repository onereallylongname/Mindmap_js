class Display {



  
  testfunc(){
    console.log("test");
  }

  render(layer){
    image(layer.graphics, layer.pos.x, layer.pos.y);
  }

}
