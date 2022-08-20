const icons = ["app-store.png", "clock.png", "files.png", "calculator.png", "settings.png"];

const taskbar = document.getElementById("taskbar");
taskbar.style.width = `${3.85 * icons.length}em`
taskbar.style.left = `calc(50% - calc(${4 * icons.length}em / 2))`

const app = document.createElement("div");
app.classList.add("app");
app.classList.add("rounded");

for (var i = 0; i < icons.length; i++) {
    let appTmp = app.cloneNode();
    appTmp.style.backgroundImage = `url("src/Icons/${icons[i]}")`;
    appTmp.style.backgroundSize = "cover";
    console.log(icons[i]);
    taskbar.appendChild(appTmp);
}