export default {
  icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1hcHAtd2luZG93Ij48cmVjdCB4PSIyIiB5PSI0IiB3aWR0aD0iMjAiIGhlaWdodD0iMTYiIHJ4PSIyIi8+PHBhdGggZD0iTTEwIDR2NCIvPjxwYXRoIGQ9Ik0yIDhoMjAiLz48cGF0aCBkPSJNNiA0djQiLz48L3N2Zz4=",
  name: "Debug",
  description: "Debug application for Midlight",
  ver: "v0.0.1",
  type: "process",
  window: {
    width: 800,
    height: 360,
    preventResize: true,
  },
  exec: async function (Root, wrapper) {
    wrapper.styleJs({
      padding: "10px",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    });
    Root.Lib.setOnEnd((_) => console.log("I have been closed!"));
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
      .text("Spawn welcome app")
      .appendTo(wrapper)
      .on("click", (e) => {
        Root.Lib.launch("apps:welcome");
      });
    new Root.Lib.html("button")
      .text("Exit app")
      .appendTo(wrapper)
      .on("click", (e) => {
        Root.Lib.onEnd();
      });
  },
};
