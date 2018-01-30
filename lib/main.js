let CANVAS_X = window.innerWidth;
let CANVAS_Y = window.innerHeight - 50;
const FR = 15;
const MR = 10;
const MYMAP_TYPE = "mymap";

// setup working classes
const OPTIONS = new GlobalOptions();
const ME = new MapEditor();
const DSP = new Display();
const COL = new ColisionCheck();
const LOADER = new Loader();
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
  // make frameRate FR FPS
  frameRate(FR);
  // setup working classes
  ML.map = new Layer(CANVAS_X, CANVAS_Y);
  ML.ui = new Layer(100, 200, true);

  // test map setup
  ME.map = ME.newMap();
  for (var i = 0; i < 6; i++) {
    ME.newTree();
  }
  loadTreesToMenu();

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
        updateTarget();
        if (OPTIONS.selected.overTarget[0] != null) {
          document.body.style.cursor = (MOUSE_MODES_OF_USE[3]);
        } else {
          document.body.style.cursor = (MOUSE_MODES_OF_USE[OPTIONS.mode.now]);
        }

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
      case 4:
        //console.log(OPTIONS.selected.tree, OPTIONS.selected.overTarget[1], OPTIONS.selected.overTarget[0], mouseX, mouseY);
        if (OPTIONS.mouseMoved(10)) {
          ME.moveNode(OPTIONS.selected.tree, OPTIONS.selected.overTarget[1], OPTIONS.selected.overTarget[0], mouseX, mouseY);
        }
        break;
      default:

    }
  } else {
    document.body.style.cursor = "pointer";
  }
}

////// >>>> DETECT TARGET ON MOUSEOVER  >>>>

function updateTarget() {
  let target = null;
  if (OPTIONS.selected.allTree) {
    for (var tree in ME.map.trees) {
      let temp = null;
      temp = mouseOnTarget(tree);
      if (temp != null) {
        target = temp;
        OPTIONS.selected.tree = tree;
      }
    }
  } else {
    target = mouseOnTarget(OPTIONS.selected.tree);
  }
  OPTIONS.selected.overTarget = target;
}

function mouseOnTarget(tree) {
  let target = null;
  let type = null;
  if(Object.keys(ME.map.trees).length > 0){
    //links
    if (target != null) {
      type = "links";
    }

    for (var nodeid in ME.map.trees[tree].nodes) {
      let newCoords = ME.changeCoordsOnMap(ME.map.trees[tree].nodes[nodeid].disp.pos.x, ME.map.trees[tree].nodes[nodeid].disp.pos.y);
      let newSize = ME.changeSizeOnMap(ME.map.trees[tree].nodes[nodeid].disp.size.x, ME.map.trees[tree].nodes[nodeid].disp.size.y);

      if (COL.pointRect(mouseX, mouseY, newCoords.x - newSize.x / 2, newCoords.y - newSize.y / 2, newSize.x, newSize.y)) {
        target = ME.map.trees[tree].nodes[nodeid].info.id;
      }
    }
    if (target != null) {
      type = "nodes";
    }
    //  ME.map.trees[trees]
  }
  return [target, type];
}

//////  <<<< DETECT TARGET ON MOUSEOVER <<<<

////// >>>> EVENTS HANDLER SECTION >>>>

// resize window

window.onresize = function() {
  CANVAS_X = window.innerWidth;
  CANVAS_Y = window.innerHeight - 50;
  resizeCanvas(CANVAS_X, CANVAS_Y, false);
  ML.map.graphics.resizeCanvas(CANVAS_X, CANVAS_Y, false);
};

function keyPressed() {
  if (OPTIONS.canvasOn) {
    let temShift = OPTIONS.keys.shift;
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
        if (OPTIONS.keys.shift) {
          OPTIONS.canvasOn = false;
          document.getElementById("file-input").click();
        } else {
          recenter();
        }
        break;
      case 78:
        if (OPTIONS.keys.shift) {
          makeNewMap();
        }
        break;
      case 83:
        if (OPTIONS.keys.shift) {
          saveMap();
        } else {
          OPTIONS.enableMode(0);
        }
        break;
      case 68:
        if (OPTIONS.keys.shift) {
          deleteTreeFromMap();
        } else {
          deleteTarget();
        }
        break;
      case 69:

        break;
      case 16:
        OPTIONS.keys.shift = true;
        break;
      default:
        console.log("default key: ", keyCode);
    }
    if (OPTIONS.keys.shift && temShift) {
      OPTIONS.keys.shift = false
    }
  }
}

function setClickedTarget() {
  OPTIONS.selected.target = OPTIONS.selected.overTarget[0];
  OPTIONS.selected.targetType = OPTIONS.selected.overTarget[1];
  if (OPTIONS.selected.target == null) {
    document.getElementById("selected-object").innerHTML = "No Target";
  } else {
    document.getElementById("selected-object").innerHTML = ME.map.trees[OPTIONS.selected.tree].nodes[OPTIONS.selected.target].name;
  }
}

// mouse press and input

function mousePressed() {
  OPTIONS.setMousePos({
    x: mouseX,
    y: mouseY
  });
  OPTIONS.mouse.offset = {
    x: 0,
    y: 0
  };
  if (mouseButton === CENTER) {
    OPTIONS.enableMode(1);
  }
  if (OPTIONS.selected.overTarget[0] != null && OPTIONS.mode.now == 0) {
    OPTIONS.setMode(4);
  }
}

function doubleClicked() {
  alert("double click");
  if (OPTIONS.selected.overTarget[0] != null && OPTIONS.mode.now == 0) {
    alert("open node editor");
  }
}

function mouseClicked(e) {
  if (OPTIONS.canvasOn) {
    switch (OPTIONS.mode.now) {
      case 0:
        setClickedTarget();
        break;
      case 2:
        ME.newNode(OPTIONS.selected.tree, mouseX, mouseY);
        break;
      default:
    }
  }
}

function mouseReleased(e) {
  checkCanvasOn(e);
  if (OPTIONS.mode.now == 4) {
    OPTIONS.setMode(0);
  }
}

window.onmouseover = function(e) {
  checkCanvasOn(e);
};

//// check mouse on canvas

function checkCanvasOn(e) {
  OPTIONS.canvasOn = ((e.target.id == OPTIONS.canvasID) && (document.activeElement.id != "file-name-input"));
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
  OPTIONS.changeZoom(amount);
  ME.zoom(OPTIONS.zoom, cx, cy); //CANVAS_X/2, CANVAS_Y/2);
  DSP.map(ML.map, ME.map);
}

// recenter

function recenter() {
  OPTIONS.zoom = 1;
  ME.zoom(OPTIONS.zoom, 0, 0);
  ME.map.pos = {
    x: 0,
    y: 0
  };
  DSP.map(ML.map, ME.map);
}

////// <<<< EVENTS HANDLER SECTION <<<<


// update Name

function updateFileName() {
  let nameDOM = document.getElementById("file-name-input");
  if (nameDOM.value.trim() == "") {
    document.getElementById("file-name-input").value = OPTIONS.mapName;
  } else {
    setFileName(nameDOM.value.replace(/[ .]/g, "_"));
  }
}

function setFileName(name) {
  OPTIONS.mapName = name;
  document.title = "Mindmap - " + OPTIONS.mapName;
  document.getElementById("file-name-input").value = name;
}


////// >>>> SAVE AND LOAD SECTION >>>>

/// save current
function saveMap() {
  LOADER.download(OPTIONS.mapName + ".mymap", JSON.stringify(ME.map));
}

function loadMap(e) {
  if (e != null && e.length == 1) {
    let tempFile = e[0].name.split('.');
    let name = tempFile[0];
    let type = tempFile[tempFile.length - 1];
    if (type === MYMAP_TYPE) {
      LOADER.upload(e);
      setFileName(name);
    } else {
      alert("File type is invalid!");
    }
  }
}

////// <<<< SAVE AND LOAD SECTION <<<<

////// >>>> BUTTONS HANDLER SECTION >>>>

/// new map

function makeNewMap() {
  ME.map = ME.newMap();
  DSP.map(ML.map, ME.map);
  setFileName("New Map");
}

/// load trees to Menu

// from: https://stackoverflow.com/questions/20673959/how-to-add-new-li-to-ul-onclick-with-javascript
function loadTreesToMenu() {
  let ul = document.getElementById("trees-select");
  if (ul != null) {
    removeAllTrees();
    let keys = Object.keys(ME.map.trees);
    if (keys.length > 0) {
      let li = document.createElement("li");
      let a = document.createElement("a");
      a.setAttribute('onclick', "selectAllTrees()");
      a.innerHTML = "Select All";
      li.appendChild(a);
      ul.appendChild(li);

      for (var i = 0; i < keys.length; i++) {
        li = document.createElement("li");
        a = document.createElement("a");
        //a.setAttribute('href', "#");
        a.setAttribute('onclick', "changeSelectedTree(this)");
        a.setAttribute("value", keys[i]);
        a.setAttribute("id", keys[i]);
        a.innerHTML = ME.map.trees[keys[i]].info.name;
        li.appendChild(a);
        li.setAttribute("class", "tree-select"); // added line
        ul.appendChild(li);
        if (i == 0) {
          changeSelectedTree(a);
        }
        console.log(li);
      }
    } else {
      updateTreeName("No Trees Available");
      OPTIONS.selected.tree = null;
    }
  }
}

// Change selectred tree
function changeSelectedTree(li) {
  if (OPTIONS.selected.allTree) {
    selectAllTrees();
  } else {
    setSelectedTree(li.getAttribute("value"));
    OPTIONS.selected.target = null;
  }
}

function setSelectedTree(val) {
  OPTIONS.selected.tree = val;
  updateTreeName(ME.map.trees[OPTIONS.selected.tree].info.name);
  DSP.map(ML.map, ME.map);
}

function selectAllTrees() {
  OPTIONS.selected.allTree = !OPTIONS.selected.allTree;
  if (OPTIONS.selected.allTree) {
    updateTreeName("All");
  } else {
    updateTreeName(ME.map.trees[OPTIONS.selected.tree].info.name);;
  }
}

// change tree name
function changeTreeName(e) {
  if (OPTIONS.selected.allTree) {
    e.value = "All";
  } else if (OPTIONS.selected.tree == null) {
    document.getElementById("file-name-input").value = "No Trees Available";
  } else if (e.value.trim() == "") {
    document.getElementById("file-name-input").value = OPTIONS.selected.tree;
  } else {
    updateTreeName(e.value);
    document.getElementById(OPTIONS.selected.tree).innerHTML = e.value;
    ME.map.trees[OPTIONS.selected.tree].info.name = e.value;
  }
  console.log(e, e.value);
}

function updateTreeName(name) {
  document.getElementById("selected-tree").innerHTML = name;
  document.getElementById("new-tree-name").value = name;
}

// create new tree
function createNewTree() {
  let localTreeid = ME.newTree();
  console.log(localTreeid);
  loadTreesToMenu();
  setSelectedTree(localTreeid);
}


// delete a tree from map
function deleteTreeFromMap() {
  if (!OPTIONS.selected.allTree) {
    ME.deleteTree(OPTIONS.selected.tree);
    loadTreesToMenu();
  }
}

// from: https://stackoverflow.com/questions/10750137/remove-all-li-from-ul
function removeAllTrees() {
  let ul = document.getElementById("trees-select");
  if (ul != null) {
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
  }
}



// delete a tree from map
function deleteTarget() {
  if (OPTIONS.selected.target != null && OPTIONS.selected.targetType != null) {
    ME.deleteTarget(OPTIONS.selected.target, OPTIONS.selected.targetType);
    setClickedTarget();
  }
}

// edit node


////// <<<< BUTTONS HANDLER SECTION <<<<


////// >>>> DEBUG SECTION >>>>

function testClick(bla) {
  console.log(bla);
}
