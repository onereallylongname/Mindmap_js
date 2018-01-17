const CANVAS_X = window.innerWidth * 0.95;
const CANVAS_Y = window.innerHeight * 0.95;
let drawLayers;
let nodeDisplay;



function setup() {
  gameCanvas = createCanvas(CANVAS_X, CANVAS_Y);
  gameCanvas.parent('div_GameCanvas');
  drawLayers = new Layers(CANVAS_X, CANVAS_Y);
  nodeDisplay = new NodeDisplay();

let testnode = Mapnode({x: 100, y: 120}, 1, "1", "2");
  nodeDisplay.display(drawLayers.nodes.graphics, testnode);

  background(50);
  textSize(32);
  fill(0, 102, 153);
  text('Hello world!', 10, 60);

noLoop();
}

function draw() {

}
