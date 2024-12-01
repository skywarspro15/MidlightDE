export default {
  name: "Bootloader",
  description: "Midlight's bootloader.",
  ver: "v0.0.1",
  type: "ui",
  exec: async function (Root, wrapper) {
    Root.Lib.setOnEnd((_) =>
      console.log("how do you even kill the boodloader")
    );
    Root.Lib.launch("ui:taskbar");
    setTimeout(() => {
      Root.Lib.launch("apps:helloWorld");
    }, 500);
    return Root.Lib.setupReturns((m) => {
      console.log("Bootloader received message: " + m);
    });
  },
};
