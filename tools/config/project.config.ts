import { join } from 'path';
import { argv } from 'yargs';
import { SeedConfig, ENVIRONMENTS } from './seed.config';

export const PLATFORMS = {
  WINDOWS: 'windows',
  MAC: 'mac',
  LINUX: 'linux',
  WEB: 'web',
  ANDROID: 'android',
  IOS: 'IOS',
};

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');
  TARRGET_PLATFORM = PLATFORMS.WEB;   //default - browser
  PRIMEUI_THEME = 'omega';            //theme for Prime NG
  FONTS_SRC = ['node_modules/font-awesome/fonts/**']; //array of needed fonts to be copied in fonts folder
  FONTS_DEST = '/fonts';
  NODE_ENV = 'development';

  constructor() {
    super();
    //IG SOFT OVERWRITES
    this.APP_TITLE = 'HTML5 Poker Client';
    //analize type of build. In TARRGET_PLATFORM is one of web/windows/android/...etc
    this.NODE_ENV =  (this.ENV === ENVIRONMENTS.DEVELOPMENT ? 'development':'production');
    //the build folder will be as dist/web/..... 
    let platform = argv['platform'];
    if (!platform) {
      platform = 'web';
    }
    if (platform && platform.indexOf('desktop') > -1) {
      //===== DESKTOP =====
      if (platform.indexOf('.mac') > -1 || platform.indexOf('.windows') > -1 || platform.indexOf('.linux') > -1) {
        if (platform.indexOf('.mac') > -1) {
          this.TARRGET_PLATFORM = PLATFORMS.MAC;
        } else if (platform.indexOf('.windows') > -1) {
          this.TARRGET_PLATFORM = PLATFORMS.WINDOWS;
        } else {
          this.TARRGET_PLATFORM = PLATFORMS.LINUX;
        }
      } else {
        throw new Error('Unknown Desktop Platform: ' + platform);
      }
      this.BOOTSTRAP_DIR = './app';
      this.BOOTSTRAP_MODULE = `${this.BOOTSTRAP_DIR}/` + (this.ENABLE_HOT_LOADING ? 'hot_loader_main' : 'main.desktop');
      this.BOOTSTRAP_PROD_MODULE = `${this.BOOTSTRAP_DIR}/` + 'main.desktop';
      this.BOOTSTRAP_FACTORY_PROD_MODULE = `${this.BOOTSTRAP_DIR}/${this.NG_FACTORY_FILE}`;
      // desktop configuration
      this.APP_BASE = './'; // paths must remain relative

      // reset system config with new APP_BASE
      this.SYSTEM_CONFIG = {
        defaultJSExtensions: true,
        paths: {
          [this.BOOTSTRAP_MODULE]: `${this.APP_BASE}${this.BOOTSTRAP_MODULE}`,
          'rxjs/*': `${this.APP_BASE}rxjs/*`,
          'app/*': `/app/*`,
          '*': `${this.APP_BASE}node_modules/*`
        },
        map: { 'electron': 'node_modules/electron' }
      };

      //this.SYSTEM_CONFIG.paths['ng2-translate/*'] = `${this.APP_BASE}node_modules/ng2-translate/*`;
      this.SYSTEM_CONFIG.paths['reflect-metadata'] = `${this.APP_BASE}node_modules/reflect-metadata/Reflect`;
    } else if (platform && platform.indexOf('mobile') > -1) {
      //===== MOBILE =====
      if (platform.indexOf('.android') > -1 || platform.indexOf('.ios') > -1) {
        if (platform.indexOf('.android') > -1) {
          this.TARRGET_PLATFORM = PLATFORMS.ANDROID;
        } else {
          this.TARRGET_PLATFORM = PLATFORMS.IOS;
        }
        this.APP_BASE = ''; // paths must remain relative
        this.BOOTSTRAP_MODULE = `${this.BOOTSTRAP_DIR}/` + (this.ENABLE_HOT_LOADING ? 'hot_loader_main' : 'main.mobile');
        this.BOOTSTRAP_PROD_MODULE = `${this.BOOTSTRAP_DIR}/` + 'main.mobile';
        this.BOOTSTRAP_FACTORY_PROD_MODULE = `${this.BOOTSTRAP_DIR}/${this.NG_FACTORY_FILE}`;
      } else {
        throw new Error('Unknown Mobile Platform: ' + platform);
      }
    }
    //as dist/windows/dev
    this.DIST_DIR = `dist/${this.TARRGET_PLATFORM}`;
    this.DEV_DEST = `${this.DIST_DIR}/dev`;
    this.PROD_DEST = `${this.DIST_DIR}/prod`;
    this.APP_DEST = this.ENV === ENVIRONMENTS.DEVELOPMENT ? this.DEV_DEST : this.PROD_DEST;
    this.CSS_DEST = `${this.APP_DEST}/css`;
    this.JS_DEST = `${this.APP_DEST}/js`;
    this.PLUGIN_CONFIGS['browser-sync'].server.baseDir = `${this.APP_DEST}/`;
    this.FONTS_SRC = ['node_modules/font-awesome/fonts/**'];
    this.FONTS_DEST = `${this.APP_DEST}/fonts`;
    console.log(this.APP_DEST);
    //if (this.TARRGET_PLATFORM != PLATFORMS.ANDROID) {
    //throw new Error('STOP ' + platform);
    //}

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},

      // IGSoft Dependencies
      { src: 'phaser/build/phaser.js', inject: 'libs' },
      { src: 'primeui/primeui-ng-all.min.js', inject: true },
      { src: `primeui/themes/${this.PRIMEUI_THEME}/theme.css`, inject: true },	//injectcss theme of primeui (subfolder of css as css/omega)
      { src: `primeui/primeui-ng-all.min.css`, inject: true },					//inject primeui css
      { src: `font-awesome/css/font-awesome.min.css`, inject: true }						//inject font-awesome used from components of primeui
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    /* Add to or override NPM module configurations: */
    // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });
  }

}
