export default {
  name: "Bootloader",
  description: "Midlight's bootloader.",
  ver: "v0.0.1",
  type: "process",
  exec: async function (Root, Core) {
    Root.Lib.setOnEnd((_) => console.log("[BOOTLOADER] Finished booting"));
    let bootScreen = new Html("div")
      .styleJs({
        backgroundColor: "black",
        zIndex: 100000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        color: "white",
      })
      .appendMany(
        new Html("img").attr({ src: "assets/Midlight.svg" }).styleJs({
          width: "100px",
          height: "100px",
        }),
        new Html("br"),
        new Html("h2").text("Please wait...")
      )
      .appendTo("body");
    await Root.Lib.launch("ui:taskbar");
    await Root.Lib.launch("system:contextmenu");
    bootScreen.cleanup();
    setTimeout(() => {
      Root.Lib.launch("apps:helloWorld");
      Root.Lib.onEnd();
    }, 500);
    return Root.Lib.setupReturns((m) => {
      console.log("Bootloader received message: " + m);
    });
  },
};
