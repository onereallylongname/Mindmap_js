function Mapnode(pos, id, type = "default") {
  return {
    info: {
      id,                   // self id, base64
      links: {},            // links it's connected to
      gen: 0,               // int       <------------- rever
      date: Date.now(),     // node creation date
      type,
    },
    title: "Title",         // node title
    data: "text",           // node text
    date: {
      start: Date.now(),    // node duedate start
      end: Date.now().add(1).hours(),    // node duedate end
    },
    disp: {
      pos,                  // node position {x, y}
      size: {x: NODE_SIZE[0], y: NODE_SIZE[1]}, // interaction radius
      color: "#222222",     // node color
      text:{
        font:'Georgia',     // text font
        color: "#eeeeee",   // text color
        size: 16,           // text font size
      },
    },
  }
}
