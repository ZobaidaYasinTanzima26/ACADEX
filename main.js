const { app, BrowserWindow } = require("electron");
const path = require("path");

function createMainWindow() {
  const win = new BrowserWindow({
    width: 1120,
    height: 760,
    minWidth: 850,
    minHeight: 600,
    title: "ACADEX - Know Your Course, Before It Begins",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.loadFile(path.join(__dirname, "index.html"));
}

app.whenReady().then(() => {
  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});