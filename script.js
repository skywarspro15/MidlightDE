// The Midlight Core

/*!
Html library by datkat21 on GitHub. Licensed under MIT
https://github.com/datkat21/html
!*/
class Html {
  /** The HTML element referenced in this instance. Change using `.swapRef()`, or remove using `.cleanup()`. */
  elm;
  /**
   * Create a new instance of the Html class.
   * @param elm The HTML element to be created or classified from.
   */
  constructor(elm) {
    if (elm instanceof HTMLElement) this.elm = elm;
    else this.elm = document.createElement(elm || "div");
  }
  /**
   * Sets the text of the current element.
   * @param val The text to set to.
   * @returns Html
   */
  text(val) {
    this.elm.innerText = val;
    return this;
  }
  /**
   * Sets the text of the current element.
   * @param val The text to set to.
   * @returns Html
   */
  html(val) {
    this.elm.innerHTML = val;
    return this;
  }
  /**
   * Safely remove the element. Can be used in combination with a `.swapRef()` to achieve a "delete & swap" result.
   * @returns Html
   */
  cleanup() {
    this.elm.remove();
    return this;
  }
  /**
   * querySelector something.
   * @param selector The query selector.
   * @returns The HTML element (not as Html)
   */
  query(selector) {
    return this.elm.querySelector(selector);
  }
  /**
   * An easier querySelector method.
   * @param query The string to query
   * @returns a new Html
   */
  qs(query) {
    if (this.elm.querySelector(query))
      return Html.from(this.elm.querySelector(query));
    else return null;
  }
  /**
   * An easier querySelectorAll method.
   * @param query The string to query
   * @returns a new Html
   */
  qsa(query) {
    if (this.elm.querySelector(query))
      return Array.from(this.elm.querySelectorAll(query)).map((e) =>
        Html.from(e)
      );
    else return null;
  }
  /**
   * Sets the ID of the element.
   * @param val The ID to set.
   * @returns Html
   */
  id(val) {
    this.elm.id = val;
    return this;
  }
  /**
   * Toggle on/off a class.
   * @param val The class to toggle.
   * @returns Html
   */
  class(...val) {
    for (let i = 0; i < val.length; i++) this.elm.classList.toggle(val[i]);
    return this;
  }
  /**
   * Toggles ON a class.
   * @param val The class to enable.
   * @returns Html
   */
  classOn(...val) {
    for (let i = 0; i < val.length; i++) this.elm.classList.add(val[i]);
    return this;
  }
  /**
   * Toggles OFF a class.
   * @param val The class to disable.
   * @returns Html
   */
  classOff(...val) {
    for (let i = 0; i < val.length; i++) this.elm.classList.remove(val[i]);
    return this;
  }
  /**
   * Apply CSS styles (dashed method.) Keys use CSS syntax, e.g. `background-color`.
   * @param obj The styles to apply (as an object of `key: value;`.)
   * @returns Html
   */
  style(obj) {
    for (const key of Object.keys(obj))
      this.elm.style.setProperty(key, obj[key]);
    return this;
  }
  /**
   * Apply CSS styles (JS method.) Keys use JS syntax, e.g. `backgroundColor`.
   * @param obj The styles to apply (as an object of `key: value;`)
   * @returns Html
   */
  styleJs(obj) {
    // @ts-expect-error
    for (const key of Object.keys(obj)) this.elm.style[key] = obj[key];
    return this;
  }
  /**
   * Apply an event listener.
   * @param ev The event listener type to add.
   * @param cb The event listener callback to add.
   * @returns Html
   */
  on(ev, cb) {
    this.elm.addEventListener(ev, cb);
    return this;
  }
  /**
   * Remove an event listener.
   * @param ev The event listener type to remove.
   * @param cb The event listener callback to remove.
   * @returns Html
   */
  un(ev, cb) {
    this.elm.removeEventListener(ev, cb);
    return this;
  }
  /**
   * Retrieve the corresponding HTMLElement.
   * @param element The element to retrieve. Can be an HTMLElement, Html instance, or a string (as query selector).
   * @returns The corresponding HTMLElement or null if QS and element are not found.
   */
  getElement(element) {
    let p = element instanceof Html ? element.elm : element;
    if (typeof element === "string") p = document.querySelector(element);
    if (p instanceof HTMLElement) return p;
    else throw new Error("Invalid element type.");
  }
  /**
   * Append this element to another element. Uses `appendChild()` on the parent.
   * @param parent Element to append to. HTMLElement, Html, and string (as querySelector) are supported.
   * @returns Html
   */
  appendTo(parent) {
    let p = this.getElement(parent);
    if (p instanceof HTMLElement) p.appendChild(this.elm);
    else throw new Error("Invalid parent element, exausted 3 checks.");
    return this;
  }
  /**
   * Prepend this element to another element. Uses `prepend()` on the parent.
   * @param parent Element to append to. HTMLElement, Html, and string (as querySelector) are supported.
   * @returns Html
   */
  prependTo(parent) {
    let p = this.getElement(parent);
    if (p instanceof HTMLElement) p.prepend(this.elm);
    return this;
  }
  /**
   * Append an element. Typically used as a `.append(new Html(...))` call.
   * @param elem The element to append.
   * @returns Html
   */
  append(elem) {
    let e = this.getElement(elem);
    if (e instanceof HTMLElement) this.elm.appendChild(e);
    else if (typeof elem === "string") {
      const newElem = document.createElement(elem);
      this.elm.appendChild(newElem);
      return new Html(newElem.tagName);
    }
    return this;
  }
  /**
   * Prepend an element. Typically used as a `.prepend(new Html(...))` call.
   * @param elem The element to prepend.
   * @returns Html
   */
  prepend(elem) {
    let e = this.getElement(elem);
    if (e instanceof HTMLElement) this.elm.prepend(e);
    else if (typeof elem === "string") {
      const newElem = document.createElement(elem);
      this.elm.prepend(newElem);
      return new Html(newElem.tagName);
    }
    return this;
  }
  /**
   * Append multiple elements. Typically used as a `.appendMany(new Html(...), new Html(...)` call.
   * @param elements The elements to append.
   * @returns Html
   */
  appendMany(...elements) {
    for (const elem of elements) this.append(elem);
    return this;
  }
  /**
   * Prepend multiple elements. Typically used as a `.prependMany(new Html(...), new Html(...)` call.
   * @param elements The elements to prepend.
   * @returns Html
   */
  prependMany(...elements) {
    for (const elem of elements) this.prepend(elem);
    return this;
  }
  /**
   * Clear the innerHTML of the element.
   * @returns Html
   */
  clear() {
    this.elm.innerHTML = "";
    return this;
  }
  /**
   * Set attributes (object method.)
   * @param obj The attributes to set (as an object of `key: value;`)
   * @returns Html
   */
  attr(obj) {
    for (let key in obj)
      if (obj[key] !== null && obj[key] !== undefined)
        this.elm.setAttribute(key, obj[key]);
      else this.elm.removeAttribute(key);
    return this;
  }
  /**
   * Set the text value of the element. Only works if element is `input` or `textarea`.
   * @param str The value to set.
   * @returns Html
   */
  val(str) {
    this.elm.value = str;
    return this;
  }
  /**
   * Retrieve text content from the element. (as innerText, not trimmed)
   * @returns string
   */
  getText() {
    return this.elm.innerText;
  }
  /**
   * Retrieve HTML content from the element.
   * @returns string
   */
  getHtml() {
    return this.elm.innerHTML;
  }
  /**
   * Retrieve the value of the element. Only applicable if it is an `input` or `textarea`.
   * @returns string
   */
  getValue() {
    return this.elm.value;
  }
  /**
   * Swap the local `elm` with a new HTMLElement.
   * @param elm The element to swap with.
   * @returns Html
   */
  swapRef(elm) {
    this.elm = elm;
    return this;
  }
  /**
   * An alternative method to create an Html instance.
   * @param elm Element to create from.
   * @returns Html
   */
  static from(elm) {
    const qs = () => Html.qs(elm);
    if (typeof elm === "string") return qs();
    return new Html(elm);
  }
  /**
   * An easier querySelector method.
   * @param query The string to query
   * @returns a new Html
   */
  static qs(query) {
    if (document.querySelector(query))
      return Html.from(document.querySelector(query));
    return null;
  }
  /**
   * An easier querySelectorAll method.
   * @param query The string to query
   * @returns a new Html
   */
  static qsa(query) {
    if (document.querySelector(query))
      return Array.from(document.querySelectorAll(query)).map((e) =>
        Html.from(e)
      );
    return null;
  }
}

console.stdlog = console.log.bind(console);
console.logs = [];
console.log = function () {
  console.logs.push(Array.from(arguments));
  console.stdlog.apply(console, arguments);
};

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

function maximizeWindow(
  winId,
  noTransition = false,
  overrideLeft = null,
  overrideTop = null
) {
  let windowElement = document.getElementById(winId);
  console.log(maximizedApps);
  if (winId in maximizedApps) {
    beforeMaximized = maximizedApps[winId];
    if (!noTransition) {
      windowElement.style.transitionDuration = "200ms";
      windowElement.style.transitionTimingFunction =
        "cubic-bezier(0.86,0,0.07,1)";
      windowElement.style.transitionProperty =
        "background-color, box-shadow, width, height, left, top, border-radius";
    } else {
      windowElement.style.transition = "none";
    }
    windowElement.style.width = beforeMaximized.width;
    windowElement.style.height = beforeMaximized.height;
    windowElement.style.left = overrideLeft
      ? overrideLeft
      : beforeMaximized.left;
    windowElement.style.top = overrideTop ? overrideTop : beforeMaximized.top;
    windowElement.style.borderRadius = beforeMaximized.borderRadius;
    delete maximizedApps[winId];
    if (!noTransition) {
      setTimeout(() => {
        windowElement.style.transitionDuration = "100ms";
        windowElement.style.transitionTimingFunction = "ease-out";
        windowElement.style.transitionProperty = "background-color, box-shadow";
      }, 200);
    }
    return;
  }
  beforeMaximized = {
    width: windowElement.style.width,
    height: windowElement.style.height,
    left: windowElement.style.left,
    top: windowElement.style.top,
    borderRadius: windowElement.style.borderRadius,
  };
  maximizedApps[winId] = beforeMaximized;
  if (!noTransition) {
    windowElement.style.transitionDuration = "200ms";
    windowElement.style.transitionTimingFunction =
      "cubic-bezier(0.19,1,0.22,1)";
    windowElement.style.transitionProperty =
      "background-color, box-shadow, width, height, left, top, border-radius";
  } else {
    windowElement.style.transition = "none";
  }
  windowElement.style.width = "100%";
  windowElement.style.height = "calc(100% - 60px)";
  windowElement.style.left = 0;
  windowElement.style.top = 0;
  windowElement.style.borderRadius = 0;
  if (!noTransition) {
    setTimeout(() => {
      windowElement.style.transitionDuration = "100ms";
      windowElement.style.transitionProperty = "background-color, box-shadow";
    }, 100);
  }
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
      maximizeWindow(
        winId,
        true,
        elmnt.offsetLeft - pos1 + "px",
        elmnt.offsetTop - pos2 + "px"
      );
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

function enableResize(winId) {
  let elmnt = document.getElementById(winId);

  // Create resize handles
  const resizeHandles = ["nw", "n", "ne", "e", "se", "s", "sw", "w"];
  resizeHandles.forEach((handle) => {
    const resizeHandle = document.createElement("div");
    resizeHandle.classList.add("resize-handle", `resize-${handle}`);
    elmnt.appendChild(resizeHandle);

    let isResizing = false;
    let startX, startY, startWidth, startHeight;

    resizeHandle.addEventListener("mousedown", (e) => {
      e.preventDefault();
      isResizing = true;
      startX = e.clientX;
      startY = e.clientY;
      startWidth = elmnt.offsetWidth;
      startHeight = elmnt.offsetHeight;

      window.addEventListener("mousemove", resize);
      window.addEventListener("mouseup", () => {
        isResizing = false;
        window.removeEventListener("mousemove", resize);
      });
    });

    function resize(e) {
      if (!isResizing) return;

      let newWidth, newHeight, newLeft, newTop;

      switch (handle) {
        case "nw":
          newWidth = startWidth - (e.clientX - startX);
          newHeight = startHeight - (e.clientY - startY);
          newLeft = e.clientX;
          newTop = e.clientY;
          break;

        case "n":
          newHeight = startHeight - (e.clientY - startY);
          newTop = e.clientY;
          break; //Only adjusts height & top
        case "ne":
          newWidth = startWidth + (e.clientX - startX);
          newHeight = startHeight - (e.clientY - startY);
          newTop = e.clientY;
          break;
        case "e":
          newWidth = startWidth + (e.clientX - startX);
          break; // Only adjusts width
        case "se":
          newWidth = startWidth + (e.clientX - startX);
          newHeight = startHeight + (e.clientY - startY);
          break;
        case "s":
          newHeight = startHeight + (e.clientY - startY);
          break; // Only adjusts height
        case "sw":
          newWidth = startWidth - (e.clientX - startX);
          newHeight = startHeight + (e.clientY - startY);
          newLeft = e.clientX;
          break;

        case "w":
          newWidth = startWidth - (e.clientX - startX);
          newLeft = e.clientX;
          break; // Only adjusts width & left
      }

      newWidth = Math.max(200, newWidth);
      newHeight = Math.max(150, newHeight);

      elmnt.style.width = newWidth + "px";
      elmnt.style.height = newHeight + "px";

      if (newLeft !== undefined) elmnt.style.left = newLeft + "px";
      if (newTop !== undefined) elmnt.style.top = newTop + "px";
    }
  });
}

function createWindow(winData, onClose) {
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
  windowDrag.addEventListener("dblclick", () => {
    if (winData.preventResize && winData.preventResize == true) {
      return;
    }
    maximizeWindow(winID);
  });
  windowFrame.appendChild(windowDrag);

  if (winData.width) {
    windowFrame.style.width = winData.width + "px";
  }
  if (winData.height) {
    windowFrame.style.height = winData.height + "px";
  }

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
      if (winData.preventResize && winData.preventResize == true) {
        button.disabled = true;
      }
      button.addEventListener("click", () => {
        if (winData.preventResize && winData.preventResize == true) {
          return;
        }
        maximizeWindow(winID);
      });
    }
    if (index == 2) {
      button.addEventListener("click", () => {
        onClose();
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
  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;

  windowFrame.style.left = x;
  windowFrame.style.top = y;
  enableDrag(winID);
  let resizeEnabled = true;
  if (winData.preventResize && winData.preventResize == true) {
    resizeEnabled = false;
  }
  if (resizeEnabled) {
    enableResize(winID);
  }
  let taskbar = document.querySelector(".taskbar-container");
  if (prevWindow) {
    prevWindow.classList.remove("focused");
  }
  windowFrame.classList.add("focused");
  windowFrame.style.zIndex = curZIndex++;
  taskbar.style.zIndex = curZIndex + 1;
  prevWindow = windowFrame;
  return {
    wrapper: new Html(windowContents),
    close: () => {
      onClose();
      closeWindow(winID);
    },
    focus: () => {
      if (prevWindow) {
        prevWindow.classList.remove("focused");
      }
      windowFrame.classList.add("focused");
      windowFrame.style.zIndex = curZIndex++;
      taskbar.style.zIndex = curZIndex + 1;
      prevWindow = windowFrame;
    },
  };
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

let apps = [];

function addToTaskbar(src, alt) {
  let taskbar = Html.qs(".apps");
  let tooltip;
  let hoverMove;
  let element = new Html("img")
    .classOn("tb-icon")
    .attr({ src: src, alt: alt, draggable: false })
    .styleJs({ userSelect: "none" })
    .appendTo(taskbar)
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

async function loadPackage(path) {
  let window;
  let taskbarIcon;
  let id = makeID(5);
  let closeCallback;
  let pid = apps.length + 1;
  let rootFunctions = {
    Lib: {
      html: Html,
      grabConsole: () => {
        return console.logs;
      },
      launch: (path) => {
        loadPackage(path);
      },
      setOnEnd: (callback) => {
        closeCallback = callback;
      },
      onEnd: () => {
        window.close();
      },
      setupReturns: function (onMessage) {
        return {
          end: this.onEnd,
          send: async (m) => {
            return await onMessage(m);
          },
        };
      },
    },
    Modal: {
      alert: (message) => {
        alert(message);
      },
    },
    PID: pid,
    Token: id,
  };

  let splitted = path.split(":");
  let constructedPath = splitted[0] + "/" + splitted[1];
  let pkg = await import(`/pkgs/${constructedPath}.js`);
  pkg = pkg.default;

  console.log(`[PACKAGES] Loaded package ${pkg.name}`);
  console.log(`[PACKAGES] Package description: ${pkg.description}`);
  console.log(`[PACKAGES] Package version: ${pkg.ver}`);
  console.log(`[PACKAGES] Package type: ${pkg.type}`);

  let windowArguments = {
    id: JSON.stringify({ name: pkg.name, id }),
    title: pkg.name,
    content: "",
  };
  let returns;

  if (pkg.window && pkg.window.width) {
    windowArguments["width"] = pkg.window.width;
    console.log(`[PACKAGES] Window width: ${pkg.window.width}`);
  }

  if (pkg.window && pkg.window.height) {
    windowArguments["height"] = pkg.window.height;
    console.log(`[PACKAGES] Window height: ${pkg.window.height}`);
  }

  if (pkg.window && pkg.window.preventResize) {
    windowArguments["preventResize"] = pkg.window.preventResize;
    console.log(`[PACKAGES] Prevent resize: ${pkg.window.preventResize}`);
  }

  let appInfo = {
    name: pkg.name,
    description: pkg.description,
    version: pkg.ver,
    type: pkg.type,
    pid: pid,
    token: id,
  };

  if (pkg.type == "process") {
    window = createWindow(windowArguments, () => {
      console.log(pid);
      if (closeCallback) closeCallback();
      taskbarIcon.cleanup();
      const index = apps.indexOf(appInfo);
      if (index > -1) {
        apps.splice(index, 1);
        console.log(apps);
      }
    });

    taskbarIcon = addToTaskbar(pkg.icon, pkg.name);
    taskbarIcon.on("click", () => {
      window.focus();
    });

    let wrapper = window.wrapper;
    returns = await pkg.exec(rootFunctions, wrapper);
  }
  if (pkg.type == "ui") {
    returns = await pkg.exec(rootFunctions, Html.qs("body"));
  }

  appInfo["proc"] = returns;
  apps.push(appInfo);
  console.log(apps);
}

loadPackage("system:bootloader");
