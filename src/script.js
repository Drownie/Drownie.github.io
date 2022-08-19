const icons = ["app-store.png", "clock.png", "files.png", "settings.png", "calculator.png"];

const taskbar = document.getElementById("taskbar");
taskbar.style.width = `${3.5 * icons.length}em`
taskbar.style.left = `calc(50% - calc(${3.5 * icons.length}em / 2))`

const app = document.createElement("div");
app.classList.add("app");

for (var i = 0; i < icons.length; i++) {
    let appTmp = app.cloneNode();
    appTmp.style.backgroundImage = `url("src/Icons/${icons[i]}")`;
    appTmp.style.backgroundSize = "cover";
    console.log(icons[i]);
    taskbar.appendChild(appTmp);
}