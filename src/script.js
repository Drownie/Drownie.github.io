const icons = ["app-store.png", "clock.png", "files.png", "calculator.png", "settings.png"];
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

for (var i = 0; i < icons.length; i++) {
    let appTmp = app.cloneNode();
    appTmp.style.backgroundImage = `url("src/Icons/${icons[i]}")`;
    appTmp.style.backgroundSize = "cover";
    // console.log(icons[i]);
    taskbar.appendChild(appTmp);
}

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

realTime();