let lib = {};
let core = {};

export default {
  name: "Context Menus",
  description: "Context menus for Midlight.",
  ver: "v0.0.1",
  type: "library",
  init: function (l, c) {
    lib = l;
    core = c;

    if (lib.html) {
      Html = lib.html;
    }
  },
  data: {
    addToMenu: (actions) => {
      core.processList
        .filter((n) => n !== null)
        .find((n) => n.name === "system:contextmenu")
        .proc.send({ type: "addToMenu", actions });
    },
  },
};
