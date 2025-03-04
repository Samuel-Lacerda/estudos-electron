console.log("Processo principal");
console.log(`Electron: ${process.versions.electron}`);
const {
  app,
  BrowserWindow,
  nativeTheme,
  Menu,
  shell,
  ipcMain,
} = require("electron");
const path = require("node:path");

// Janela principal
const createWindow = () => {
  nativeTheme.themeSource = "light";
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: "./src/public/img/computador.png",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    // resizable: false,
    // autoHideMenuBar: true,
    // titleBarStyle: "hidden",
  });

  //   Menu personalizado
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));

  win.loadFile("./src/views/index.html");
};

//Janela secundária
const childWindow = () => {
  const father = BrowserWindow.getFocusedWindow();
  if (father) {
    const child = new BrowserWindow({
      width: 640,
      height: 480,
      icon: "./src/public/img/computador.png",
      resizable: false,
      autoHideMenuBar: true,
      parent: father,
      modal: true,
    });
    child.loadFile("./src/views/child.html");
  }
};

// Janela sobre
const aboutWindow = () => {
  const about = new BrowserWindow({
    width: 360,
    height: 220,
    icon: "./src/public/img/computador.png",
    autoHideMenuBar: true,
    resizable: false,
  });

  about.loadFile("./src/views/sobre.html");
};

app.whenReady().then(() => {
  createWindow();
  //   aboutWindow();

  // IPC
  ipcMain.on("open-child", () => {
    childWindow();
  });

  ipcMain.on("renderer-message", (event, message) => {
    console.log(`Processo principal recebeu uma mensagem: ${message}`);
    event.reply("main-message", "Olá, renderizador!");
  });
  // ---------
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// Templete do menu
const template = [
  {
    label: "Arquivo",

    submenu: [
      { label: "Janela secundária", click: () => childWindow() },
      { label: "Sair", click: () => app.quit(), accelerator: "Alt+F4" },
    ],
  },
  {
    label: "Exibir",
    submenu: [
      { label: "Recarregar", role: "reload" },
      { label: "Ferramentas do desenvolvedor", role: "toggleDevTools" },
    ],
  },
  {
    label: "Ajuda",
    submenu: [
      {
        label: "docs",
        click: () =>
          shell.openExternal("https://www.electronjs.org/docs/latest"),
      },
      { type: "separator" },
      { label: " Sobre", click: () => aboutWindow() },
    ],
  },
];
