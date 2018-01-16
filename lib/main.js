const CANVAS_X = window.innerWidth * 0.85;
const CANVAS_Y = window.innerHeight * 0.85;
let drawLayers;
let nodeDisplay;



function setup() {
  gameCanvas = createCanvas(CANVAS_X, CANVAS_Y);
  gameCanvas.parent('div_GameCanvas');
  drawLayers = new Layers(CANVAS_X, CANVAS_Y);
  nodeDisplay = new NodeDisplay();
let testnode = Mapnode({x: 20, y: 20}, 1, "1", "2");
  nodeDisplay.display(drawLayers.nodes, testnode);
  background(50);
  textSize(32);
  fill(0, 102, 153);
  text('Hello world!', 10, 60);

noLoop();
}

function draw() {

}
