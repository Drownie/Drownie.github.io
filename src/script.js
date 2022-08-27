const icons = ["photo-booth", "clock", "files", "calculator", "settings", "terminal"];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const toggles = [false, false, false, false, false, false]

// Topbar
const topBar = document.getElementsByClassName("top-bar");

// Taskbar
const taskbar = document.getElementById("taskbar");
taskbar.style.width = `${3.85 * icons.length}em`
taskbar.style.left = `calc(50% - calc(${4 * icons.length}em / 2))`

// Create app element
const app = document.createElement("div");
app.classList.add("app");
app.classList.add("rounded");

// Desktop time
const desktopTime = document.getElementById("desktop-time");

// Create app element
for (var i = 0; i < icons.length; i++) {
    let x = i
    let appTmp = app.cloneNode();
    appTmp.style.backgroundImage = `url("src/Icons/${icons[i]}.png")`;
    appTmp.style.backgroundSize = "cover";
    appTmp.onclick = () => onAppClick(icons[x]);
    taskbar.appendChild(appTmp);
}

// terminal
const terminal = document.getElementsByClassName("terminal-content");

$(terminal).terminal( 
  {
    iam: function (name) {
      this.echo('Hello, ' + name +
          '. My Name is Abraham Mahanaim');
    },
    help: function () {
      this.echo(
        "iam [name] - print greeting command\n" +
        "help - print all command available\n" +
        "times - get current time\n"
      );
    },
    times: function () {
      this.echo(
        "Agu, 25 22:34"
      );
    }
  }, {
    greetings: null,
    prompt: "Abraham@Drownie-Git-Io:~$ ",
    name: 'test',
    height: 500
  }
);

function realTime() {
    const time = new Date();
    let h = time.getHours() % 12;
    let m = time.getMinutes();
    let s = time.getSeconds();
    let d = days[time.getDay()];
    let p = time.getHours() >= 12 ? "PM" : "AM";
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
    desktopTime.innerHTML = `${d} ${h}:${m} ${p}`;
    document.getElementById("clock-time").innerHTML = `${d} ${h}:${m}:${s} ${p}`
    // console.log(`${d} ${h}:${m} ${p}`);
    setTimeout(realTime, 1000)
}

function checkTime(i) {
    if (i < 10) { i = "0" + i };
    return i;
}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "-top")) {
      // console.log(elmnt)
      document.getElementById(elmnt.id + "-top").onmousedown = dragMouseDown;
    } else {
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      // console.log(e)
      e = e || terminal.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || terminal.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      // Y-axis limit
      // console.log(elmnt.offsetTop + elmnt.offsetHeight, window.innerHeight)
      if (elmnt.offsetTop - pos2 - 1 < topBar[0].offsetHeight) {
        elmnt.style.top = topBar[0].offsetHeight + "px";
      } else if (elmnt.offsetTop + elmnt.offsetHeight - pos2 > window.innerHeight) {
        elmnt.style.top = (window.innerHeight - elmnt.offsetHeight) + "px";
      } else {
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      }
      
      // X-axis limit
      if (elmnt.offsetWidth + elmnt.offsetLeft - pos1 > window.innerWidth) {
        elmnt.style.left = (window.innerWidth - elmnt.offsetWidth) + "px";
      } else if (elmnt.offsetLeft - pos1 < 0) {
        elmnt.style.left = "0px";
      } else {
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }
      // console.log(`pos1= ${pos1} pos2=${pos2} pos3=${pos3} pos4=${pos4}`)
    }
  
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
}

function onAppClick(name) {
  toggle = null;
  if (name == "photo-booth") {
    toggles[0] = !toggles[0];
    toggle = toggles[0];
  } else if (name == "clock") {
    toggles[1] = !toggles[1];
    toggle = toggles[1];
  } else if (name == "files") {
    toggles[2] = !toggles[2];
    toggle = toggles[2];
  } else if (name == "calculator") {
    toggles[3] = !toggles[3];
    toggle = toggles[3];
  } else if (name == "settings") {
    toggles[4] = !toggles[4];
    toggle = toggles[4];
  } else if (name == "terminal") {
    toggles[5] = !toggles[5];
    toggle = toggles[5];
  }

  if (toggle == null) return ;
  if (toggle) {
    document.getElementById(name).style.display = "block";
  } else {
    document.getElementById(name).style.display = "none";
  }
}

realTime();
for (var i = 0; i < icons.length; i++) {
  dragElement(document.getElementById(icons[i]));
  interact(`#${icons[i]}`)
    .resizable({
      edges: {top: false, left: true, bottom: true, right: true},
      listeners: {
        move: function (e) {
          let {x, y} = e.target.dataset;
          x = (parseFloat(x) || 0) + e.deltaRect.left;
          y = (parseFloat(y) || 0) + e.deltaRect.top;

          Object.assign(e.target.style, {
            width: `${e.rect.width}px`,
            height: `${e.rect.height}px`,
            transform: `translate(${x}px, ${y}px)`
          });

          Object.assign(e.target.dataset, { x, y });
        }
      }
    });
}