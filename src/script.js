const icons = ["app-store.png", "clock.png", "files.png", "calculator.png", "settings.png", "terminal.png"];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

// Create app node
for (var i = 0; i < icons.length; i++) {
    let appTmp = app.cloneNode();
    appTmp.style.backgroundImage = `url("src/Icons/${icons[i]}")`;
    appTmp.style.backgroundSize = "cover";
    // console.log(icons[i]);
    taskbar.appendChild(appTmp);
}

// terminal
const terminal = document.getElementsByClassName("terminal-content");

$(terminal).terminal( {
    iam: function (name) {
        this.echo('Hello, ' + name +
            '. My Name is Abraham Mahanaim');
    }
    }, {
        greetings: null,
        prompt: "Abraham@Drownie-Git-Io:~$ ",
        name: 'test',
        height: 500
    });

function realTime() {
    const time = new Date();
    let h = time.getHours() % 12;
    let m = time.getMinutes();
    let d = days[time.getDay()];
    let p = time.getHours() >= 12 ? "PM" : "AM";
    h = checkTime(h);
    m = checkTime(m);
    desktopTime.innerHTML = `${d} ${h}:${m} ${p}`;
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
      document.getElementById(elmnt.id + "-top").onmousedown = dragMouseDown;
    } else {
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
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
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

realTime();
dragElement(document.getElementById("terminal"));