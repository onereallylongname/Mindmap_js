class NodeDisplay {

  processeNodes(layer, links){
    for (var id in links) {
      processe(layer, links[id]);
    }
  }

  processe(layer, links){
    this["testfunc"]();

  }

  testfunc(){
    console.log("test");
  }

}
