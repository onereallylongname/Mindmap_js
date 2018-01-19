class ColisionCheck {

  // CIRCLE/RECTANGLE
  // from: http://www.jeffreythompson.org/collision-detection/circle-rect.php
  square( cx,  cy,  radius,  rx,  ry,  rw,  rh){
    // CIRCLE/RECTANGLE
    // temporary variables to set edges for testing
     testX = cx;
     testY = cy;
    // which edge is closest?
    if (cx < rx)         testX = rx;      // test left edge
    else if (cx > rx+rw) testX = rx+rw;   // right edge
    if (cy < ry)         testY = ry;      // top edge
    else if (cy > ry+rh) testY = ry+rh;   // bottom edge
    // get distance from closest edges
     distX = cx-testX;
     distY = cy-testY;
     distance = sqrt( (distX*distX) + (distY*distY) );
    // if the distance is less than the radius, collision!
    if (distance <= radius) {
      return true;
    }
    return false;
  }



}
