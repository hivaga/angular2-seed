import * as electron from "electron";



process.env.NODE_ENV = process.env.NODE_ENV || '<%= NODE_ENV %>';
console.log(`Electron launching with NODE_ENV: ${process.env.NODE_ENV}`);


// electron
let app:Electron.App = electron.app;
let Menu:any  = electron.Menu;
let shell: Electron.Shell = electron.shell;
//let dialog: Electron.Dialog = electron.dialog;



//console.log("IpcMain:",ipcMain);

// const {crashReporter} = require('electron');
//let BrowserWindow = electron.BrowserWindow;
//let remote:Electron.Remote = electron.remote;
let mainWindow: Electron.BrowserWindow;
let template: Electron.MenuItemOptions;
let menu: Electron.Menu;
let nodeJSGlobal:any = global;

// we create a VO to hold all globaly shared data accross the application
//nodeJSGlobal[PokerGlobalDataVO.GLOBAL_DATA_VO_REMOTE_KEY] = new PokerGlobalDataVO();
//(nodeJSGlobal[PokerGlobalDataVO.GLOBAL_DATA_VO_REMOTE_KEY] as PokerGlobalDataVO).onModelsUpdate.add(onModelsUpdateHandler);

// app
//import {AppConfigService} from './app/frameworks/app/services/app-config.service';

// Sample
// You would need a valid `submitURL` to use
// crashReporter.start({
//   productName: 'Angular2SeedAdvanced',
//   companyName: 'NathanWalker',
//   submitURL: 'https://github.com/NathanWalker/angular2-seed-advanced',
//   autoSubmit: true
// });


if (process.env.NODE_ENV === 'development') {
  require('electron-debug')({showDevTools: true});
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {

  // Initialize the window to our specified dimensions
  mainWindow = new electron.BrowserWindow({ width: 1280, height: 768 });

  // Tell Electron where to load the entry point from
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Clear out the main window when the app is closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.on('did-navigate-in-page', (e: any, url: string) => {
    console.log(`Page navigated: ${url}`);
  });

  let appTitle: string = `Poker Desktop Application`;

  let langMenu: any = {
    label: 'Language',
    submenu: []
  };

  // Build Languages menu
  /*for (var lang of AppConfigService.SUPPORTED_LANGUAGES) {
    let code = lang.code;
    let langOption = {
      label: lang.title,
      click:() => {
        console.log(`Change lang: ${code}`);
        mainWindow.webContents.executeJavaScript(`window.dispatchEvent(new CustomEvent('changeLang', {detail: { value: '${code}'} }));`);
      }
    };
    langMenu.submenu.push(langOption);
  }*/

  let helpMenu: any = {
    label: 'Help',
    submenu: [{
      label: 'Learn More',
      click:() => {
        shell.openExternal('https://github.com/NathanWalker/angular2-seed-advanced');
      }
    }, {
        label: 'Issues',
        click:() => {
          shell.openExternal('https://github.com/NathanWalker/angular2-seed-advanced/issues');
        }
      }, {
        label: `My Amazing Parent: Minko Gechev's Angular 2 Seed`,
        click:() => {
          shell.openExternal('https://github.com/mgechev/angular2-seed');
        }
      }, {
        label: 'Angular 2',
        click:() => {
          shell.openExternal('https://angular.io/');
        }
      }, {
        label: 'Electron',
        click:() => {
          shell.openExternal('http://electron.atom.io/');
        }
      }, {
        label: 'Electron Docs',
        click: () => {
          shell.openExternal('https://github.com/atom/electron/tree/master/docs');
        }
      }, {
        label: 'Codeology Visualization',
        click:() => {
          shell.openExternal('http://codeology.braintreepayments.com/nathanwalker/angular2-seed-advanced');
        }
      }]
  };

  if (process.platform === 'darwin') {
    template = [{
      label: appTitle,
      submenu: [{
        label: `About ${appTitle}`,
        selector: 'orderFrontStandardAboutPanel:'
      }, {
          type: 'separator'
        }, {
          label: 'Services',
          submenu: []
        }, {
          type: 'separator'
        }, {
          label: 'Hide Angular 2 Seed Advanced',
          accelerator: 'Command+H',
          selector: 'hide:'
        }, {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          selector: 'hideOtherApplications:'
        }, {
          label: 'Show All',
          selector: 'unhideAllApplications:'
        }, {
          type: 'separator'
        }, {
          label: 'Quit',
          accelerator: 'Command+Q',
          click:() => {
            app.quit();
          }
        }]
    }, {
        label: 'Edit',
        submenu: [{
          label: 'Undo',
          accelerator: 'Command+Z',
          selector: 'undo:'
        }, {
            label: 'Redo',
            accelerator: 'Shift+Command+Z',
            selector: 'redo:'
          }, {
            type: 'separator'
          }, {
            label: 'Cut',
            accelerator: 'Command+X',
            selector: 'cut:'
          }, {
            label: 'Copy',
            accelerator: 'Command+C',
            selector: 'copy:'
          }, {
            label: 'Paste',
            accelerator: 'Command+V',
            selector: 'paste:'
          }, {
            label: 'Select All',
            accelerator: 'Command+A',
            selector: 'selectAll:'
          }]
      }, {
        label: 'View',
        submenu: (process.env.NODE_ENV === 'development') ? [{
          label: 'Reload',
          accelerator: 'Command+R',
          click:() => {
	          (mainWindow as any).restart();
          }
        }, {
            label: 'Toggle Full Screen',
            accelerator: 'Ctrl+Command+F',
            click:() => {
	            (mainWindow as any).setFullScreen(!mainWindow.isFullScreen());
            }
          }, {
            label: 'Toggle Developer Tools',
            accelerator: 'Alt+Command+I',
            click:() => {
	            (mainWindow as any).toggleDevTools();
            }
          }] : [{
            label: 'Toggle Full Screen',
            accelerator: 'Ctrl+Command+F',
            click:() => {
              mainWindow.setFullScreen(!mainWindow.isFullScreen());
            }
          }]
      }, {
        label: 'Window',
        submenu: [{
          label: 'Minimize',
          accelerator: 'Command+M',
          selector: 'performMiniaturize:'
        }, {
            label: 'Close',
            accelerator: 'Command+W',
            selector: 'performClose:'
          }, {
            type: 'separator'
          }, {
            label: 'Bring All to Front',
            selector: 'arrangeInFront:'
          }]
      },
      langMenu,
      helpMenu];

    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  } else {
    template = [{
      label: '&File',
      submenu: [{
        label: '&Open',
        accelerator: 'Ctrl+O'
      }, {
          label: '&Close',
          accelerator: 'Ctrl+W',
          click:() => {
            mainWindow.close();
          }
        }]
    }, {
        label: '&View',
        submenu: (process.env.NODE_ENV === 'development') ? [{
          label: '&Reload',
          accelerator: 'Ctrl+R',
          click:() => {
	          (mainWindow as any).restart();
          }
        }, {
            label: 'Toggle &Full Screen',
            accelerator: 'F11',
            click:() => {
              mainWindow.setFullScreen(!mainWindow.isFullScreen());
            }
          }, {
            label: 'Toggle &Developer Tools',
            accelerator: 'F12',
            click:() => {
	            (mainWindow as any).toggleDevTools();
            }
          }] : [{
            label: 'Toggle &Full Screen',
            accelerator: 'F11',
            click:() => {
              mainWindow.setFullScreen(!mainWindow.isFullScreen());
            }
          }]
      },
      langMenu,
      helpMenu];
    menu = Menu.buildFromTemplate(template);
    mainWindow.setMenu(menu);
  }

});

let allWebContents:Electron.WebContents[];
let webContent:Electron.WebContents;

/* Immediately notify all renderers about global model change */
function onModelsUpdateHandler():void
{
	allWebContents = electron.webContents.getAllWebContents();

	for (webContent of allWebContents)
	{
		//webContent.send(PokerGlobalDataVO.EVENT_MODEL_CHANGED);
	}
}

