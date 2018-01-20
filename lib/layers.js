class Layers {

  constructor(windX, windY) {
    this.map = {empty: true};
    this.ui  = {empty: true};
  }

  move(layer, amount){
    if (!layer.empty) {
      console.log(layer.pos);
      console.log(layer.pos - amount);
    }
  }

}
