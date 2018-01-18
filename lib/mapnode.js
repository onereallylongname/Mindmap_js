function Mapnode(pos, generation, pID, sID, cID = [], type = "generic") {
  return {
    selfInfo: {
      generation,         // int
      pID,                // parent id, base64
      sID,                // self id, base64
      cID,                // cildid, base64 array
      related: [],        // related id, base64 array
      type,               // type of node (generic, flow, note, time, ...)
      date: Date.now(),   // node creation date
    },
    title: "Title",       // node title
    date: {
      start: Date.now(),  // node duedate start
      end: Date.now().add(1).hours(),    // node duedate end
    },
    data: "text",         // node text
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
