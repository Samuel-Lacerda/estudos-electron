const { app, BrowserWindow, nativeTheme, Menu } = require("electron");

// Janela principal
const createWindow = () => {
  nativeTheme.themeSource = "light";
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: "./src/public/img/computador.png",
    // resizable: false,
    // autoHideMenuBar: true,
    // titleBarStyle: "hidden",
  });

  //   Menu personalizado
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));

  win.loadFile("./src/views/index.html");
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
  { label: "Ajuda" },
];
