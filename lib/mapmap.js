function Mapmap(version, id, size) {
  return {
    info: {
      version,
      id,                 // self id, base64
      date: Date.now(),   // node creation date
    },
    pos: {x: 0, y: 0},
    size,
    zoom: 1,
    trees: {},
    disp:{
      color: "#006699",
    }
  }
}
