export default {
  icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1hcHAtd2luZG93Ij48cmVjdCB4PSIyIiB5PSI0IiB3aWR0aD0iMjAiIGhlaWdodD0iMTYiIHJ4PSIyIi8+PHBhdGggZD0iTTEwIDR2NCIvPjxwYXRoIGQ9Ik0yIDhoMjAiLz48cGF0aCBkPSJNNiA0djQiLz48L3N2Zz4=",
  name: "Welcome",
  description: "Debug application for Midlight",
  ver: "v0.0.1",
  type: "process",
  window: {
    width: 854,
    height: 480,
  },
  exec: async function (Root, wrapper) {
    wrapper.styleJs({
      padding: "10px",
      display: "flex",
      flexDirection: "column",
      gap: "5px",
      alignItems: "center",
      justifyContent: "center",
    });
    Root.Lib.setOnEnd((_) => console.log("I have been closed!"));
    new Root.Lib.html("h1").text("Welcome to Midlight!").appendTo(wrapper);
    new Root.Lib.html("p")
      .html(
        "A web OS with a sleek interface that features a similar dev experience to Pluto."
      )
      .appendTo(wrapper);
    new Root.Lib.html("button")
      .text("Exit app")
      .appendTo(wrapper)
      .on("click", (e) => {
        Root.Lib.onEnd();
      });
  },
};
