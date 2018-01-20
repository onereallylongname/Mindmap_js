function Layer(windX, windY, empty = false, posX = 0, posY = 0, posZ = 0) {
  return {
    empty,
    size: {x: windX, y: windY},
    pos: new Pos(posX, posY),
    z: posZ,
    graphics: createGraphics(windX, windY),
  }
}
