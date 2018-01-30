class Loader {

  download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  upload(e) {
    var file = e[0];
    if (!file) {
      console.log("NO FILES");
      return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
      var contents = e.target.result;

      ME.map = JSON.parse(contents);
      
      DSP.map(ML.map, ME.map);

      loadTreesToMenu();
      let keys = Object.keys(ME.map.trees);
      console.log(keys);

      if (keys.length > 0) {
        OPTIONS.selected.tree = ME.map.trees[keys[0]].info.id;
        updateTreeName(ME.map.trees[keys[0]].info.name);
      } else {
        updateTreeName("Map has no Trees");
      }
    };
    reader.readAsText(file);
  }



}
