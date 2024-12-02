export default {
  name: "Context Menus",
  description: "Context menus for Midlight.",
  ver: "v0.0.1",
  type: "ui",
  exec: async function (Root, Core) {
    let ctxMenu;
    let clickDetection;
    Root.Lib.setOnEnd((_) =>
      console.log("[CONTEXT MENUS] Loaded Context menus")
    );
    let curLeft;
    let curTop;
    function displayCtxMenu() {
      console.log("[CONTEXT MENUS] Opening context menu");
      if (clickDetection) {
        clickDetection.cleanup();
      }
      if (ctxMenu) {
        ctxMenu.cleanup();
      }
      clickDetection = new Html("div")
        .styleJs({
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 10000,
        })
        .appendTo("body");
      ctxMenu = new Html("div")
        .styleJs({
          position: "absolute",
          top: `${curTop}px`,
          left: `${curLeft}px`,
          padding: "10px",
          borderRadius: "6px",
          backdropFilter: "blur(50px) saturate(50%)",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "var(--window-focused)",
          zIndex: 10001,
          minWidth: "300px",
        })
        .appendTo("body");
      clickDetection.on("click", () => {
        ctxMenu.cleanup();
        clickDetection.cleanup();
        ctxMenu = null;
        clickDetection = null;
      });
    }

    function addToMenu(obj) {
      if (!ctxMenu) {
        displayCtxMenu();
      }
      Object.keys(obj).forEach((action) => {
        new Html("button")
          .text(action)
          .appendTo(ctxMenu)
          .styleJs({
            background: "transparent",
            border: "none",
            textAlign: "left",
          })
          .on("click", () => {
            obj[action]();
            ctxMenu.cleanup();
            clickDetection.cleanup();
            ctxMenu = null;
            clickDetection = null;
          });
      });
    }

    document.addEventListener(
      "contextmenu",
      function (e) {
        curLeft = e.clientX;
        curTop = e.clientY;
        console.log("[CONTEXT MENUS] Right click detected");
        let pointingAt = document.elementFromPoint(e.clientX, e.clientY);
        let ctxId = pointingAt.getAttribute("ctxid");
        document.dispatchEvent(
          new CustomEvent("midlight-context-menu", { detail: ctxId })
        );
        e.preventDefault();
      },
      false
    );

    return Root.Lib.setupReturns((m) => {
      console.log("Context menus received message: " + m);
      if (m.type == "addToMenu") {
        addToMenu(m.actions);
      }
    });
  },
};
