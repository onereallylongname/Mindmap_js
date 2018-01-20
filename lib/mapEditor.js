// Contains the map and the functions to operate on a map
class MapEditor {

  constructor() {
    this.changeTracker = [];
    this.map = {};
  }

  newMap(){
    return Mapmap( OPTIONS.version, B64.fromInt(Math.random() * 10000000000))
  }


  testfunc(){
    console.log("test");
  }

}
