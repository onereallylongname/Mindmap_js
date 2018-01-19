const CANVAS_X = window.innerWidth * 0.95;
const CANVAS_Y = window.innerHeight * 0.95;
const FR = 10;
const MR = 10;

let flags = {
  pressed: false,
  mouseOnpressed: {x: 0, y: 0},
  selected: [],
  mode: "pointer"

}

let map;
let layer;
let display;
let colChecker;

function setup() {
  // setup canvas
  gameCanvas = createCanvas(CANVAS_X, CANVAS_Y);
  gameCanvas.parent('div_GameCanvas');
  frameRate(FR); // make frameRate 10 FPS
  // setup working classes
  layer = new Layer(CANVAS_X, CANVAS_Y);
  display = new Display();
  colChecker = new ColisionCheck();

  // test map setup
  map = Mapmap(1, "m1");
  map.trees["t1"] = Maptree("t1");
  map.trees.t1.nodes["n1"] = Mapnode({x: 200, y: 200}, "n1");
  map.trees.t1.nodes["n2"] = Mapnode({x: 250, y: 100}, "n2", "n1");
  map.trees.t1.nodes["n3"] = Mapnode({x: 300, y: 300}, "n3", "n1");
  map.trees.t1.nodes["n4"] = Mapnode({x: 500, y: 600}, "n4", "n2");
  map.trees.t1.nodes["n5"] = Mapnode({x: 500, y: 300}, "n5", "n1");
  map.trees.t1.nodes["n6"] = Mapnode({x: 700, y: 500}, "n6", "n5");
  map.trees.t1.nodes["n7"] = Mapnode({x: 200, y: 500}, "n7", "n6");

  map.trees.t1.links["l1"] = Maplink("n1", "n2", "l1");
  map.trees.t1.links["l2"] = Maplink("n1", "n3", "l2");
  map.trees.t1.links["l3"] = Maplink("n2", "n4", "l3");

//let testnode = Mapnode({x: 100, y: 120, z:0 }, 1, "1", "2");
  display.processe(layer, map);
  //display.dN.processe(layer, testnode);


}



function draw() {



}



function mousePressed() {
  flags.pressed = true;
  for (var link in tree.links) {
    console.log(link, tree.links[link]);
    this.processe(layer, tree.links[link]);
  }
  console.log("mousePressed");
}

function mouseReleased() {
  flags.pressed = false;
  console.log("mouseReleased");
}

function overlaingNode(pos1, r1, pos2, r2){
  return dist(x1, y1, x2, y2) <= r1 + r2;
}

function overlaingLink(pos1, r1, pos2, r2){
  return dist(x1, y1, x2, y2) <= r1 + r2;
}

function overlaingTree(pos1, r1, pos2, r2){
  return dist(x1, y1, x2, y2) <= r1 + r2;
}

function loadMap() {

}

function saveMap() {

}
