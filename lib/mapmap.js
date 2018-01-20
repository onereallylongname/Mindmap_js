function Mapmap(version, id) {
  return {
    info: {
      version,
      id,                 // self id, base64
      date: Date.now(),   // node creation date
    },
    pos: {x: 0, y: 0},
    zoom: 1,
    trees: {},
    disp:{
      color: "#006699",
    }
  }
}
