class Pos {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  set({x, y}){
    this.x = x;
    this.y = y;
    return this;
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
