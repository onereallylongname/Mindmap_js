function Maptree(id, type = "default") {
  return {
    info: {
      id,                 // self id, base64
      type,
      date: Date.now(),   // node creation date
    },
    nodes: {},
    links: {},
    disp: {
      pos: {x: 0, y: 0},
      size: {x: 60, y: 60},
    },
  }
}
