function Maplink(from, to, id, type = "default") {
  return {
    info: {
      id,                 // self id, base64
      type,
    },
    from,
    to,
    data: "text",         // link text
    cost: 1,
    disp: {
      color: "#222222",   // link color
      stroke: 3,          // link thikness
      text:{
        font:'Georgia',    // text font
        color: "#eeeeee",  // text color
        size: 16,          // text font size
      },
    },
  }
}
