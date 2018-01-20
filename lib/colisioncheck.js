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


  // from: http://www.jeffreythompson.org/collision-detection/line-circle.php

  // LINE/CIRCLE
  boolean lineCircle(float x1, float y1, float x2, float y2, float cx, float cy, float r) {

    // is either end INSIDE the circle?
    // if so, return true immediately
    boolean inside1 = pointCircle(x1,y1, cx,cy,r);
    boolean inside2 = pointCircle(x2,y2, cx,cy,r);
    if (inside1 || inside2) return true;

    // get length of the line
    float distX = x1 - x2;
    float distY = y1 - y2;
    float len = sqrt( (distX*distX) + (distY*distY) );

    // get dot product of the line and circle
    float dot = ( ((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1)) ) / pow(len,2);

    // find the closest point on the line
    float closestX = x1 + (dot * (x2-x1));
    float closestY = y1 + (dot * (y2-y1));

    // is this point actually on the line segment?
    // if so keep going, but if not, return false
    boolean onSegment = linePoint(x1,y1,x2,y2, closestX,closestY);
    if (!onSegment) return false;

    // optionally, draw a circle at the closest
    // point on the line
    fill(255,0,0);
    noStroke();
    ellipse(closestX, closestY, 20, 20);

    // get distance to closest point
    distX = closestX - cx;
    distY = closestY - cy;
    float distance = sqrt( (distX*distX) + (distY*distY) );

    if (distance <= r) {
      return true;
    }
    return false;
  }


  // POINT/CIRCLE
  boolean pointCircle(float px, float py, float cx, float cy, float r) {

    // get distance between the point and circle's center
    // using the Pythagorean Theorem
    float distX = px - cx;
    float distY = py - cy;
    float distance = sqrt( (distX*distX) + (distY*distY) );

    // if the distance is less than the circle's
    // radius the point is inside!
    if (distance <= r) {
      return true;
    }
    return false;
  }

}