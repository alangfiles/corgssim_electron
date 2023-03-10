// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const path = require("path");

const isDev = require("electron-is-dev");

const fs = require("fs");

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "CORGS Simulator",
    // webPreferences: {
    //   preload: path.join(__dirname, "preload.js"),
    // },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  mainWindow.removeMenu();

  //debug devtools
  mainWindow.webContents.openDevTools();

  return mainWindow;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  let mainWindow = createWindow();
  mainWindow.setFullScreen(true);
  mainWindow.webContents.executeJavaScript("localStorage.clear()");
  mainWindow.webContents.executeJavaScript(
    `localStorage.setItem('sanity', "test");`
  );

  const loadFileToLocalStorage = (file, title) => {
    const byteString = file.toString("base64");
    mainWindow.webContents.executeJavaScript(
      `localStorage.setItem('blob-${title}', "${byteString}");`
    );
  };

  const corgssim = fs.readFileSync(
    isDev
      ? "public/roms/corgssim.nes"
      : `${path.join(__dirname, "../build/roms/corgssim.nes")}`
  );
  loadFileToLocalStorage(corgssim, "corgssim");
  const corgssimJ = fs.readFileSync(
    isDev
      ? "public/roms/corgssimf.nes"
      : `${path.join(__dirname, "../build/roms/corgssimf.nes")}`
  );
  loadFileToLocalStorage(corgssimJ, "corgssimJ");

  app.on("activate", function() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function() {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
