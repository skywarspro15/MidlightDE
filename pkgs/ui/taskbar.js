export default {
  name: "Taskbar",
  description: "Midlight's taskbar.",
  ver: "v0.0.1",
  type: "ui",
  exec: async function (Root, wrapper) {
    Root.Lib.setOnEnd((_) =>
      console.log("did someone kill the fucking taskbar?????")
    );
    let Html = Root.Lib.html;
    let tbContainer = new Html("div")
      .classOn("taskbar-container")
      .appendTo(wrapper);
    let tb = new Html("div").classOn("taskbar").appendTo(tbContainer);
    let apps = new Html("div").classOn("apps").appendTo(tb);
    new Html("img")
      .attr({ src: "assets/Midlight.svg", alt: "Midlight menu" })
      .classOn("tb-icon")
      .appendTo(apps);
    let timeDate = new Html("div").classOn("timeDate").appendTo(tb);
    let time = new Html("p").classOn("time").appendTo(timeDate).elm;
    let date = new Html("p").classOn("date").appendTo(timeDate).elm;

    function formatTime(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;

      return strTime;
    }

    function formatDate(date) {
      var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      var day = date.getDate();

      var strDate =
        daysOfWeek[date.getDay()] + ", " + months[date.getMonth()] + " " + day;
      return strDate;
    }

    time.innerText = formatTime(new Date());
    date.innerText = formatDate(new Date());

    setInterval(() => {
      time.innerText = formatTime(new Date());
      date.innerText = formatDate(new Date());
    }, 1000);

    function addToTaskbar(src, alt, onClick, id) {
      let taskbar = Html.qs(".apps");
      let tooltip;
      let hoverMove;
      let element = new Html("img")
        .classOn("tb-icon")
        .attr({ src: src, alt: alt, draggable: false, id: id })
        .styleJs({ userSelect: "none" })
        .appendTo(taskbar)
        .on("click", onClick)
        .on("mouseover", (e) => {
          tooltip = new Html("div")
            .classOn("taskbar-tooltip")
            .text(alt)
            .appendTo("body")
            .styleJs({ left: e.clientX - 20 + "px", zIndex: 1000 });
          document.addEventListener("mousemove", (e) => {
            tooltip.styleJs({ left: e.clientX - 20 + "px", zIndex: 1000 });
          });
        })
        .on("mouseout", () => {
          if (tooltip) {
            tooltip.cleanup();
          }
          if (hoverMove) {
            document.removeEventListener("mousemove", hoverInt);
          }
        });
      return element;
    }

    function removeFromTaskbar(id) {
      let element = Html.qs(`#${id}`);
      element.cleanup();
    }

    return Root.Lib.setupReturns((m) => {
      console.log("Taskbar received message: " + m);
      if (m.type == "addToTaskbar") {
        addToTaskbar(m.src, m.alt, m.callback, m.iconId);
      }
      if (m.type == "removeFromTaskbar") {
        removeFromTaskbar(m.iconId);
      }
    });
  },
};
