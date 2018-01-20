const CANVAS_X = window.innerWidth * 0.95;
const CANVAS_Y = window.innerHeight * 0.95;
const FR = 5;
const MR = 10;

// setup working classes
const OPTIONS = new GlobalOptions();
const ME = new MapEditor();
const DSP = new Display();
const COL = new ColisionCheck();

let mapLayer;


function setup() {
  // setup canvas
  gameCanvas = createCanvas(CANVAS_X, CANVAS_Y);
  gameCanvas.parent('div_GameCanvas');
  // from: https://github.com/processing/p5.js/issues/1437
  gameCanvas.mouseWheel(mouseWheelHandler);
  gameCanvas.mousePressed(mousePressedHandler);
  //  gameCanvas.mouseDragged(mouseDraggedHandler);
  frameRate(FR); // make frameRate 10 FPS
  // setup working classes
  mapLayer = new Layer(CANVAS_X, CANVAS_Y);

  // test map setup
  ME.map = ME.newMap();
  ME.map.trees["t1"] = Maptree("t1");
  ME.map.trees.t1.nodes["n1"] = Mapnode({
    x: 200,
    y: 200
  }, "n1");
  ME.map.trees.t1.nodes["n2"] = Mapnode({
    x: 250,
    y: 100
  }, "n2", "n1");
  ME.map.trees.t1.nodes["n3"] = Mapnode({
    x: 300,
    y: 300
  }, "n3", "n1");
  ME.map.trees.t1.nodes["n4"] = Mapnode({
    x: 500,
    y: 600
  }, "n4", "n2");
  ME.map.trees.t1.nodes["n5"] = Mapnode({
    x: 500,
    y: 300
  }, "n5", "n1");
  ME.map.trees.t1.nodes["n6"] = Mapnode({
    x: 700,
    y: 500
  }, "n6", "n5");
  ME.map.trees.t1.nodes["n7"] = Mapnode({
    x: 200,
    y: 500
  }, "n7", "n1");
  ME.map.trees.t1.nodes["n8"] = Mapnode({
    x: 100,
    y: 500
  }, "n8", "n1");
  ME.map.trees.t1.nodes["n9"] = Mapnode({
    x: 300,
    y: 600
  }, "n9", "n1");

  ME.map.trees.t1.links["l1"] = Maplink("n1", "n2", "l1");
  ME.map.trees.t1.links["l2"] = Maplink("n1", "n3", "l2");
  ME.map.trees.t1.links["l3"] = Maplink("n2", "n4", "l3");
  ME.map.trees.t1.links["l4"] = Maplink("n6", "n4", "l4");
  ME.map.trees.t1.links["l5"] = Maplink("n1", "n7", "l5");
  ME.map.trees.t1.links["l6"] = Maplink("n1", "n8", "l6");
  ME.map.trees.t1.links["l7"] = Maplink("n1", "n9", "l7");

  //let testnode = Mapnode({x: 100, y: 120, z:0 }, 1, "1", "2");
  DSP.map(mapLayer, ME.map);
  //display.dN.processe(layer, testnode);


}


function draw() {
  //DSP.map(mapLayer, ME.map);
  OPTIONS.updateMode();

}

function mouseWheelHandler(event) {
  //move the square according to the vertical scroll amount
  OPTIONS.zoom += event.deltaY * -0.001;
  OPTIONS.zoom = constrain(OPTIONS.zoom, OPTIONS.minZoom, OPTIONS.maxZoom);
  console.log(OPTIONS.zoom);
  DSP.map(mapLayer, ME.map);
  //uncomment to block page scrolling
  return false;
}

function mousePressedHandler(event) {
  OPTIONS.mode.old = OPTIONS.mode.now;
  if (event.ctrlKey) {
    OPTIONS.setMode(1);
  }
  console.log("mousePressed");
  console.log(event);

}

function mouseDragged(event) {
  if (OPTIONS.mode.now == 1) {
    console.log("mouseDragged");
    console.log(event);
  }
}

function mouseReleased() {
  OPTIONS.resetMode();
  console.log("mouseReleased");
}


function loadMap() {

}

function saveMap() {

}
