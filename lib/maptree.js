function Maptree(id, name = "new tree", type = "default") {
  return {
    info: {
      id,                 // self id, base64
      type,
      date: Date.now(),   // node creation date
      name,
    },
    nodes: {},
    links: {},
  }
}
