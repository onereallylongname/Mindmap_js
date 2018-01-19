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

  // LINE/POINT
  linePoint( x1,  y1,  x2,  y2,  px,  py) {
    // get distance from the point to the two ends of the line
     d1 = dist(px,py, x1,y1);
     d2 = dist(px,py, x2,y2);
    // get the length of the line
     lineLen = dist(x1,y1, x2,y2);
    // since floats are so minutely accurate, add
    // a little buffer zone that will give collision
     buffer = 0.1;    // higher # = less accurate
    // if the two distances are equal to the line's
    // length, the point is on the line!
    // note we use the buffer here to give a range,
    // rather than one #
    if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
      return true;
    }
    return false;
  }

}
