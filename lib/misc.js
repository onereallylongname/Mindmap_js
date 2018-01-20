class Pos {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(pos){
    this.x += pos.x;
    this.y += pos.y;
    return this;
  }

  mult(constant){
    this.x *= constant;
    this.y *= constant;
    return this;
  }
}
