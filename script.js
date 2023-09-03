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

let isDragging = false;
let currentlyDragging;
let prevWindow;

let maximizedApps = {};
let beforeMaximized = {};
let windowInstances = {};

let curZIndex = 10;
let currentlyFocused = "";
let prevX;
let prevY;
let prevW;
let prevH;

function closeWindow(winId) {
  let windowElement = document.getElementById(winId);
  let windowID = windowElement.id;
  let idParsed = jsonParse(windowID);
  if (idParsed) {
    if (idParsed.name in windowInstances) {
      console.log(windowInstances[idParsed.name]);
      if (windowInstances[idParsed.name] == 1) {
        document
          .querySelectorAll("." + idParsed.name + "-script")
          .forEach((e) => e.remove());
      }
    }
  }
  windowInstances[idParsed.name] = windowInstances[idParsed.name] - 1;
  windowElement.style.animation =
    "exitOut 0.5s cubic-bezier(0.19, 1, 0.22, 1) forwards";
  setTimeout(() => {
    windowElement.remove();
  }, 498);
}

function maximizeWindow(winId) {
  let windowElement = document.getElementById(winId);
  console.log(maximizedApps);
  if (winId in maximizedApps) {
    beforeMaximized = maximizedApps[winId];
    windowElement.style.transitionDuration = "200ms";
    windowElement.style.transitionTimingFunction =
      "cubic-bezier(0.86,0,0.07,1)";
    windowElement.style.transitionProperty =
      "background-color, box-shadow, width, height, left, top";
    windowElement.style.width = beforeMaximized.width;
    windowElement.style.height = beforeMaximized.height;
    windowElement.style.left = beforeMaximized.left;
    windowElement.style.top = beforeMaximized.top;
    delete maximizedApps[winId];
    setTimeout(() => {
      windowElement.style.transitionDuration = "100ms";
      windowElement.style.transitionTimingFunction = "ease-out";
      windowElement.style.transitionProperty =
        "background-color, box-shadow, width, height";
    }, 200);
    return;
  }
  beforeMaximized = {
    width: windowElement.style.width,
    height: windowElement.style.height,
    left: windowElement.style.left,
    top: windowElement.style.top,
  };
  maximizedApps[winId] = beforeMaximized;
  windowElement.style.transitionDuration = "200ms";
  windowElement.style.transitionTimingFunction = "cubic-bezier(0.19,1,0.22,1)";
  windowElement.style.transitionProperty =
    "background-color, box-shadow, width, height, left, top";
  windowElement.style.width = "100%";
  windowElement.style.height = "100%";
  windowElement.style.left = 0;
  windowElement.style.top = 0;
  setTimeout(() => {
    windowElement.style.transitionDuration = "100ms";
    windowElement.style.transitionProperty =
      "background-color, box-shadow, width, height";
  }, 100);
}

function maximizeWindow(winId) {
  let windowElement = document.getElementById(winId);
  console.log(maximizedApps);
  if (winId in maximizedApps) {
    beforeMaximized = maximizedApps[winId];
    windowElement.style.transitionDuration = "200ms";
    windowElement.style.transitionTimingFunction =
      "cubic-bezier(0.19,1,0.22,1)";
    windowElement.style.transitionProperty =
      "background-color, box-shadow, width, height, left, top";
    windowElement.style.width = beforeMaximized.width;
    windowElement.style.height = beforeMaximized.height;
    windowElement.style.left = beforeMaximized.left;
    windowElement.style.top = beforeMaximized.top;
    delete maximizedApps[winId];
    setTimeout(() => {
      windowElement.style.transitionDuration = "100ms";
      windowElement.style.transitionTimingFunction = "ease-out";
      windowElement.style.transitionProperty =
        "background-color, box-shadow, width, height";
    }, 200);
    return;
  }
  beforeMaximized = {
    width: windowElement.style.width,
    height: windowElement.style.height,
    left: windowElement.style.left,
    top: windowElement.style.top,
  };
  maximizedApps[winId] = beforeMaximized;
  windowElement.style.transitionDuration = "200ms";
  windowElement.style.transitionTimingFunction = "cubic-bezier(0.19,1,0.22,1)";
  windowElement.style.transitionProperty =
    "background-color, box-shadow, width, height, left, top";
  windowElement.style.width = "100%";
  windowElement.style.height = "100%";
  windowElement.style.left = 0;
  windowElement.style.top = 0;
  setTimeout(() => {
    windowElement.style.transitionDuration = "100ms";
    windowElement.style.transitionProperty =
      "background-color, box-shadow, width, height";
  }, 100);
}

function enableDrag(winId) {
  let elmnt = document.getElementById(winId);
  let taskbar = document.querySelector(".taskbar-container");
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  let header = elmnt.querySelector(".window-drag");

  if (header) {
    // if present, the header is where you move the DIV from:
    header.onmousedown = dragMouseDown;
    elmnt.onmousedown = windowFocus;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    curZIndex++;
    if (prevWindow) {
      prevWindow.classList.remove("focused");
    }
    elmnt.classList.add("focused");
    elmnt.style.zIndex = curZIndex++;
    prevWindow = elmnt;
    taskbar.style.zIndex = curZIndex + 1;
    window.onmouseup = closeDragElement;
    window.onmousemove = elementDrag;
  }

  function windowFocus(e) {
    curZIndex++;
    if (prevWindow) {
      prevWindow.classList.remove("focused");
    }
    elmnt.classList.add("focused");
    elmnt.style.zIndex = curZIndex++;
    prevWindow = elmnt;
    taskbar.style.zIndex = curZIndex + 1;
  }

  function elementDrag(e) {
    e = e || window.event;
    if (winId in maximizedApps) {
      maximizeWindow(winId);
    }
    e.preventDefault();
    isDragging = true;
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    window.onmouseup = null;
    window.onmousemove = null;
  }
}

function createWindow(winData) {
  const winID = winData.id;
  const winTitle = winData.title;
  const winContent = winData.content;
  const windowFrame = document.createElement("div");
  windowFrame.id = winID;
  windowFrame.classList.add("window-frame");

  // Create the window drag
  const windowDrag = document.createElement("div");
  windowDrag.classList.add("window-drag");
  windowDrag.textContent = winTitle;
  windowFrame.appendChild(windowDrag);

  // Create the window controls
  const windowControls = document.createElement("div");
  windowControls.classList.add("window-controls");
  const controlButtons = ["", "", ""];
  controlButtons.forEach((buttonText, index) => {
    const button = document.createElement("button");
    button.classList.add("controls");
    button.textContent = buttonText;
    if (index == 0) {
      button.addEventListener("click", () => {
        alert("minimize");
      });
    }
    if (index == 1) {
      button.addEventListener("click", () => {
        maximizeWindow(winID);
      });
    }
    if (index == 2) {
      button.addEventListener("click", () => {
        closeWindow(winID);
      });
    }
    windowControls.appendChild(button);
  });
  windowFrame.appendChild(windowControls);

  // Create the window contents
  const windowContents = document.createElement("div");
  windowContents.classList.add("window-contents");
  windowContents.innerHTML = winContent;
  windowFrame.appendChild(windowContents);

  document.body.appendChild(windowFrame);
  enableDrag(winID);
}

function makeID(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function jsonParse(jsonString) {
  try {
    var o = JSON.parse(jsonString);
    if (o && typeof o === "object") {
      return o;
    }
  } catch (e) {}

  return false;
}

async function getData(path) {
  let respText = "";
  await fetch(path)
    .then((response) => response.text())
    .then((data) => {
      respText = data;
    });
  return respText;
}

function scriptLoaded(url) {
  if (!url) return false;
  var scripts = document.getElementsByTagName("script");
  for (var i = scripts.length; i--; ) {
    if (scripts[i].src == url) return true;
  }
  return false;
}

async function loadPackage(path) {
  document.body.style.cursor = "wait";
  let rawData = await getData(path + "/app.json");
  let package = jsonParse(rawData);

  let script = path + "/" + package.script;
  let scriptExists = document.querySelector("." + package.name + "-script");

  if (!scriptExists) {
    let scriptElement = document.createElement("script");
    scriptElement.src = script;
    scriptElement.className = package.name + "-script";
    document.body.appendChild(scriptElement);
  }

  let winContent = await getData(path + "/" + package.content);

  createWindow({
    id: JSON.stringify({ name: package.name, id: makeID(5) }),
    title: package.name,
    content: winContent,
  });

  if (package.name in windowInstances) {
    windowInstances[package.name] = windowInstances[package.name] + 1;
  } else {
    windowInstances[package.name] = 1;
  }

  document.body.style.cursor = "default";
}

loadPackage("applications/terminal");
loadPackage("applications/terminal");
