class ColisionCheck {


  node(x1, y1, r1, x2, y2, r2){
    return dist(x1, y1, x2, y2) <= r1 + r2;
  }

  // POINT/RECTANGLE
  pointRect( px,  py,  rx,  ry,  rw,  rh) {
  // is the point inside the rectangle's bounds?
    return (px >= rx &&        // right of the left edge AND
      px <= rx + rw &&   // left of the right edge AND
      py >= ry &&        // below the top AND
      py <= ry + rh);
    }

    // RECTANGLE inside RECTANGLE
    circleOnRect( r1x,  r1y,  r1,  r2x0,  r2x1,  r2y0,  r2y1) {

    // are the sides of one rectangle touching the other?
    return (r1x - r1 > r2x0 &&    // r1 right edge past r2 left
        r1y - r1 > r2y0 &&    // r1 left edge past r2 right
        r1x + r1 < r2x1 &&    // r1 top edge past r2 bottom
        r1y + r1 < r2y1);
  }

  // CIRCLE/RECTANGLE
  // from: http://www.jeffreythompson.org/collision-detection/circle-rect.php
  boundingBox( cx,  cy,  radius,  rx,  ry,  rw,  rh){
    // CIRCLE/RECTANGLE
    // temporary variables to set edges for testing
    let testX = cx;
    let testY = cy;
    // which edge is closest?
    if (cx < rx)         testX = rx;      // test left edge
    else if (cx > rw) testX = rw;   // right edge
    if (cy < ry)         testY = ry;      // top edge
    else if (cy > rh) testY = rh;   // bottom edge
    // get distance from closest edges
    let distX = cx-testX;
    let distY = cy-testY;
    let distance = sqrt( (distX*distX) + (distY*distY) );
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
    // since s are so minutely accurate, add
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


  // from: http://www.jeffreythompson.org/collision-detection/line-circle.php

  // LINE/CIRCLE
  link( x1,  y1,  x2,  y2,  cx,  cy,  r) {

    // is either end INSIDE the circle?
    // if so, return true immediately
     inside1 = pointCircle(x1,y1, cx,cy,r);
     inside2 = pointCircle(x2,y2, cx,cy,r);
    if (inside1 || inside2) return true;

    // get length of the line
     distX = x1 - x2;
     distY = y1 - y2;
     len = sqrt( (distX*distX) + (distY*distY) );

    // get dot product of the line and circle
     dot = ( ((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1)) ) / pow(len,2);

    // find the closest point on the line
     closestX = x1 + (dot * (x2-x1));
     closestY = y1 + (dot * (y2-y1));

    // is this point actually on the line segment?
    // if so keep going, but if not, return false
     onSegment = linePoint(x1,y1,x2,y2, closestX,closestY);
    if (!onSegment) return false;

    // optionally, draw a circle at the closest
    // point on the line
    fill(255,0,0);
    noStroke();
    ellipse(closestX, closestY, 20, 20);

    // get distance to closest point
    distX = closestX - cx;
    distY = closestY - cy;
     distance = sqrt( (distX*distX) + (distY*distY) );

    if (distance <= r) {
      return true;
    }
    return false;
  }


  // POINT/CIRCLE
  pointCircle( px,  py,  cx,  cy,  r) {

    // get distance between the point and circle's center
    // using the Pythagorean Theorem
     distX = px - cx;
     distY = py - cy;
     distance = sqrt( (distX*distX) + (distY*distY) );

    // if the distance is less than the circle's
    // radius the point is inside!
    if (distance <= r) {
      return true;
    }
    return false;
  }

}
