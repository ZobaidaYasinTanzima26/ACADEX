const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindows() {
  const splashWin = new BrowserWindow({
    width: 520,
    height: 300,
    frame: false,
    resizable: false,
    center: true,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  splashWin.loadFile(path.join(__dirname, "splash.html"));

  const mainWin = new BrowserWindow({
    width: 1120,
    height: 760,
    minWidth: 850,
    minHeight: 600,
    show: false,
    title: "ACADEX - Know Your Course, Before It Begins",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWin.loadFile(path.join(__dirname, "index.html"));

  setTimeout(() => {
    if (!splashWin.isDestroyed()) {
      splashWin.close();
    }
    mainWin.show();
  }, 3200);
}

app.whenReady().then(() => {
  createWindows();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindows();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});