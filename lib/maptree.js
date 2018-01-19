function Maptree(id, type = "generic") {
  return {
    info: {
      id,                 // self id, base64
      type,
      date: Date.now(),   // node creation date
    },
    nodes: {},
    links: {},
    bounding: {
      x: {min: 0, max: 60},
      y: {min: 0, max: 60},
    },
  }
}
