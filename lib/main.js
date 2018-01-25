let CANVAS_X = window.innerWidth;
let CANVAS_Y = window.innerHeight - 50;
const FR = 15;
const MR = 10;

// setup working classes
const OPTIONS = new GlobalOptions();
const ME = new MapEditor();
const DSP = new Display();
const COL = new ColisionCheck();
const ML = new Layers();
//let mapLayer;

// test variable
let x;

function setup() {
  // setup canvas
  gameCanvas = createCanvas(CANVAS_X, CANVAS_Y);
  OPTIONS.canvasID = gameCanvas.canvas.id;
  gameCanvas.parent('div_GameCanvas');
  // from: https://github.com/processing/p5.js/issues/1437
  gameCanvas.mouseWheel(mouseWheelHandler);
  //gameCanvas.mousePressed(mousePressedHandler);
  //  gameCanvas.mouseDragged(mouseDraggedHandler);
  frameRate(FR); // make frameRate 10 FPS
  //MOUSE_MODES_OF_USE = [ARROW, MOVE, CROSS, HAND, MOVE, TEXT, WAIT];
  // setup working classes
  ML.map = new Layer(CANVAS_X, CANVAS_Y);
  ML.ui = new Layer(100, 200, true);

  // test map setup
  ME.map = ME.newMap();
  ME.map.trees["t1"] = Maptree("t1");
  OPTIONS.selected.tree = "t1";
  // ME.map.trees.t1.nodes["n1"] = Mapnode({
  //   x: 200,
  //   y: 200
  // }, "n1");
  // ME.map.trees.t1.nodes["n2"] = Mapnode({
  //   x: 250,
  //   y: 100
  // }, "n2");
  // ME.map.trees.t1.nodes["n3"] = Mapnode({
  //   x: 300,
  //   y: 300
  // }, "n3");
  // ME.map.trees.t1.nodes["n4"] = Mapnode({
  //   x: 500,
  //   y: 600
  // }, "n4");
  // ME.map.trees.t1.nodes["n5"] = Mapnode({
  //   x: 500,
  //   y: 300
  // }, "n5");
  // ME.map.trees.t1.nodes["n6"] = Mapnode({
  //   x: 700,
  //   y: 500
  // }, "n6");
  // ME.map.trees.t1.nodes["n7"] = Mapnode({
  //   x: 200,
  //   y: 500
  // }, "n7");
  // ME.map.trees.t1.nodes["n8"] = Mapnode({
  //   x: 100,
  //   y: 500
  // }, "n8");
  // ME.map.trees.t1.nodes["n9"] = Mapnode({
  //   x: 300,
  //   y: 600
  // }, "n9");
  //
  // ME.map.trees.t1.links["l1"] = Maplink("n1", "n2", "l1");
  // ME.map.trees.t1.links["l2"] = Maplink("n1", "n3", "l2");
  // ME.map.trees.t1.links["l3"] = Maplink("n2", "n4", "l3");
  // ME.map.trees.t1.links["l4"] = Maplink("n6", "n4", "l4");
  // ME.map.trees.t1.links["l5"] = Maplink("n1", "n7", "l5");
  // ME.map.trees.t1.links["l6"] = Maplink("n1", "n8", "l6");
  // ME.map.trees.t1.links["l7"] = Maplink("n1", "n9", "l7");

  //let testnode = Mapnode({x: 100, y: 120, z:0 }, 1, "1", "2");
  DSP.map(ML.map, ME.map);
  //display.dN.processe(layer, testnode);

}


function draw() {
  if (OPTIONS.canvasOn) {
    //DSP.map(mapLayer, ME.map);
    OPTIONS.updateMode();
    document.body.style.cursor = (MOUSE_MODES_OF_USE[OPTIONS.mode.now]);

    DSP.map(ML.map, ME.map);


    // if (round(mouseX) == 500) {
    //         OPTIONS.enableMode(2);
    // }

    // console.log(mouseX);
    switch (OPTIONS.mode.now) {
      case 0:

        break;
      case 1:
        if (mouseIsPressed) {
          let temp = new Pos(0, 0);
          temp.set(OPTIONS.mouseDrag({
            x: mouseX,
            y: mouseY,
          }));
          //    ML.move(ML.ui, dif);
          //    DSP.ui(ML.ui, //ui);
          ME.move(temp);
          DSP.map(ML.map, ME.map);
        }
        break;
      default:

    }
  }
}
// resize window

window.onresize = function() {
  CANVAS_X = window.innerWidth;
  CANVAS_Y = window.innerHeight - 50;
  resizeCanvas(CANVAS_X, CANVAS_Y, false);
  ML.map.graphics.resizeCanvas(CANVAS_X, CANVAS_Y, false);
};

function keyPressed() {
  if (OPTIONS.canvasOn) {
    switch (keyCode) {
      case 77:
        OPTIONS.enableMode(1);
        break;
      case 65:
        OPTIONS.enableMode(2);
        break;
      case 187:
        pageZoom(250, mouseX, mouseY);
        break;
      case 189:
        pageZoom(-250, mouseX, mouseY);
        break;
      case 79:
        recenter();
        break;
      case 83:
        OPTIONS.enableMode(0);
        break;
      default:
        console.log("default key: ", keyCode);
    }
  }
}

// mouse press and input

function mousePressed() {
  if (mouseButton === CENTER) {
    OPTIONS.enableMode(1);
  }
  OPTIONS.setMousePos({
    x: mouseX,
    y: mouseY
  });
}

function mouseClicked(e) {
  if (OPTIONS.canvasOn) {
    if (OPTIONS.mode.now == 2) {
      ME.newNode(OPTIONS.selected.tree, mouseX, mouseY);
    }
  }
}
function mouseReleased(e) {
  checkCanvasOn(e);
}

window.onmouseover = function(e) {
  checkCanvasOn(e);
};

//// check mouse on canvas

function checkCanvasOn(e) {
  OPTIONS.canvasOn = ((e.target.id == OPTIONS.canvasID) && (document.activeElement.id != "file-name-input"));
  console.log(OPTIONS.canvasOn, document.activeElement.id);
}


// handle zoom --------------------------

function mouseWheelHandler(event) {
  if (OPTIONS.canvasOn) {
    pageZoom(event.deltaY, mouseX, mouseY);
  }
  return false;
}

function clickZoom(amount) {
  pageZoom(amount, CANVAS_X / 2, CANVAS_Y / 2)
}

function pageZoom(amount, cx, cy) {
  console.log(amount);
  OPTIONS.changeZoom(amount);
  ME.zoom(OPTIONS.zoom, cx, cy); //CANVAS_X/2, CANVAS_Y/2);
  DSP.map(ML.map, ME.map);
}

// recenter

function recenter(){
  OPTIONS.zoom = 1;
  ME.zoom(OPTIONS.zoom, 0, 0);
  ME.map.pos = {x: 0, y: 0};
  DSP.map(ML.map, ME.map);
}

// update Name

function updateFileName() {
  let nameDOM = document.getElementById("file-name-input");
  setFileName(nameDOM.value);
}

function setFileName(name) {
  OPTIONS.mapName = name;
  document.title = "Mindmap - " + OPTIONS.mapName;
  document.getElementById("file-name-input").value = name;
}


/// Save and Load ------------------------------------------------------------

/// save
function saveMap() {
  download(OPTIONS.mapName + ".mymap", JSON.stringify(ME.map));
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

//// load

function readSingleFile(e) {
  var file = e[0];
  if (!file) {
    console.log("NO FILES");
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    displayContents(contents);
  };
  reader.readAsText(file);
}

function displayContents(contents) {
  ME.map = JSON.parse(contents);
  DSP.map(ML.map, ME.map);
  console.log(ME.map);
}

function loadMap(e) {
  x = e;
  console.log(x);
  if (x != null && x.length == 1) {
    readSingleFile(x);
    setFileName(x[0].name.split('.')[0]);
  }
}

/// new map

function makeNewMap() {
  ME.map = ME.newMap();
  DSP.map(ML.map, ME.map);
  setFileName("New Map");
}
