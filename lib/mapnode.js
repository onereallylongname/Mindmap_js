function Mapnode(pos, gen, id, pid, type = "generic") {
  return {
    info: {
      id,                 // self id, base64
      pid,                // parent id, base64
      gen,                // int
      date: Date.now(),   // node creation date
    },
    title: "Title",       // node title
    data: "text",         // node text
    date: {
      start: Date.now(),  // node duedate start
      end: Date.now().add(1).hours(),    // node duedate end
    },
    disp: {
      pos,                // node position {x, y}
      color: "#222222",   // node color
      text:{
        font:'Georgia',    // text font
        color: "#eeeeee",  // text color
        size: 16,          // text font size
      },
    },
  }
}
