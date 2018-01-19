function Maptree(id, type = "generic") {
  return {
    info: {
      id,                 // self id, base64
      type,
      date: Date.now(),   // node creation date
    },
    nodes: {},
    links: {},
  }
}
