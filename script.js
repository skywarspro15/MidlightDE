let time = document.querySelector(".time");
let date = document.querySelector(".date");

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
