class Layer {

  constructor(windX, windY, posX = 0, posY = 0, posZ = 0) {
    this.pos = {x: posX, y: posY, z: posZ};
    this.graphics =  createGraphics(windX, windY);
  }

}
