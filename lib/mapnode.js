function Mapnode(pos, generation, pID, sID, cID = []) {
  return {
      selfInfo: {
        generation,       // int
        pID,              // parent id, base64
        sID,              // self id, base64
        cID,              // cildid, base64 array
        related: [],      // related id, base64 array
      },
      title: "Title",     // node title
      date: new Date(),   // node creation date
      data: "text",       // node text
      disp: {
        pos,              // node position
        color: "#222222", // node color
        tcolor: "#eeeeee",// text color
      }
  }
}
