import path from "path";
const { app, BrowserWindow, Menu, Tray } = require("electron");
import icon from "trayTemplate.png";

const menuTemplate = [
  {
    label: "My App",
    submenu: [
      { role: "about" },
      { type: "separator" },
      { role: "services" },
      { type: "separator" },
      { role: "hide" },

      { role: "hideothers" },
      { role: "unhide" },
      { type: "separator" },
      { role: "quit" },
    ],
  },
  {
    label: "Custom Menu",
    submenu: [{ label: "custom" }, { type: "separator" }],
  },
];

const ctxMenuTemplate = [
  { label: "Копировать" },
  { label: "Вырезать" },
  { type: "separator" },
  { label: "Вставить" },
];

const ctxMenu = new Menu.buildFromTemplate(ctxMenuTemplate);

const createMenu = () => {
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
};

// const createWindow = () => {
//   let window = new BrowserWindow({
//     width: 700,
//     height: 700,
//     webPreferences: {
//       nodeIntegration: true,
//     },
//   });
//   window.loadFile("renderer/index.html");
//   window.on("ready-to-show", () => window.show());

//   window.webContents.on("context-menu", (event, params) => {
//     ctxMenu.popup(window, params.x, params.y);
//   });
// };

app.on("ready", () => {
  const trayMenu = new Menu.buildFromTemplate([
    {
      label: "Show Awesome App",
      click: () => {
        window.isVisible() ? window.hide() : window.show();
      },
    },
    {
      role: "quit",
    },
  ]);
  const tray = new Tray(path.resolve(__dirname, icon));
  tray.setContextMenu(trayMenu);
  tray.setToolTip("Electron App");

  createMenu();
  let window = new BrowserWindow({
    width: 700,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
    },
  });
});
