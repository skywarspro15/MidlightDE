export default {
  name: "Debug",
  description: "Debug application for Midlight",
  ver: "v0.0.1",
  type: "process",
  window: {
    width: 800,
    height: 460,
    preventResize: true,
  },
  exec: async function (Root) {
    let MyWindow;
    const Win = (await Root.Lib.loadLibrary("WindowSystem")).win;
    MyWindow = new Win({
      icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1hcHAtd2luZG93Ij48cmVjdCB4PSIyIiB5PSI0IiB3aWR0aD0iMjAiIGhlaWdodD0iMTYiIHJ4PSIyIi8+PHBhdGggZD0iTTEwIDR2NCIvPjxwYXRoIGQ9Ik0yIDhoMjAiLz48cGF0aCBkPSJNNiA0djQiLz48L3N2Zz4=",
      title: "Debug",
      pid: Root.PID,
      width: 300,
      height: 415,
      onclose: () => {
        Root.Lib.onEnd();
      },
    });

    Root.Lib.setOnEnd((_) => {
      console.log("I have been closed!");
      MyWindow.close();
    });
    console.log(MyWindow);

    let wrapper = new Html(MyWindow.window.querySelector(".win-content"));
    wrapper.styleJs({
      padding: "10px",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    });
    new Root.Lib.html("h1").text("Hello, Midlight!").appendTo(wrapper);
    new Root.Lib.html("p")
      .html("This is a debug app for Midlight")
      .appendTo(wrapper);
    new Root.Lib.html("button")
      .text("Window information")
      .appendTo(wrapper)
      .on("click", (e) => {
        Root.Modal.alert(
          `Hello!\nCursor Position: ${e.clientX}, ${e.clientY}\nMy PID: ${Root.PID}\nMy Token: ${Root.Token}`
        );
      });
    new Root.Lib.html("button")
      .text("Spawn another one")
      .appendTo(wrapper)
      .on("click", (e) => {
        Root.Lib.launch("apps:helloWorld");
      });
    new Root.Lib.html("button")
      .text("Spawn a Pluto app")
      .appendTo(wrapper)
      .on("click", (e) => {
        Root.Lib.launch("apps:plutoApp");
      });
    new Root.Lib.html("button")
      .text("Grab console")
      .appendTo(wrapper)
      .on("click", (e) => {
        alert(Root.Lib.grabConsole());
      });
    new Root.Lib.html("button")
      .text("Exit app")
      .appendTo(wrapper)
      .on("click", (e) => {
        Root.Lib.onEnd();
      });
    return Root.Lib.setupReturns((m) => {
      console.log("Example received message: " + m);
    });
  },
};
