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
  },
};
