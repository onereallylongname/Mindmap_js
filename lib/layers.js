class Layers {

  constructor(windX, windY) {
    this.map = {empty: true};
    this.ui  = {empty: true};
    
  }move(layer, amount){
    if (!layer.empty) {
      layer.pos.add(amount);
    }
  }

  zoom(layer){
    scale(OPTIONS.zoom, OPTIONS.zoom);
  }

}
