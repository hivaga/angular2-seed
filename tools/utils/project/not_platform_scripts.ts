import { PLATFORMS } from '../../config/project.config';
import Config from '../../config';
import { join } from 'path';

//exclude scripts for not used platforms
//add scripts for exclude to src
export function not_platform_scripts(src:string[], path:string) {
    if (Config.TARRGET_PLATFORM === PLATFORMS.WEB) {
    //Exclude Desktop & Mobile related sources
    src.push('!' + join(path, 'start.desktop.ts'));
    src.push('!' + join(path, 'app/main.desktop.ts'));
    src.push('!' + join(path, 'app/platform/desktop/**'));
    src.push('!' + join(path, 'app/platform/mobile/**'));
  } else if ((Config.TARRGET_PLATFORM === PLATFORMS.IOS) || (Config.TARRGET_PLATFORM === PLATFORMS.ANDROID)) {
    //Exclude Desktop & Browser build related sources
    src.push('!' + join(path, 'start.desktop.ts'));
    src.push('!' + join(path, 'app/main.desktop.ts'));
    src.push('!' + join(path, 'app/platform/desktop/**'));
    src.push('!' + join(path, 'app/platform/browser/**'));
  } else {
    //Exclude Browser& Mobile build related sources
    src.push('!' + join(path, 'app/platform/browser/**'));
    src.push('!' + join(path, 'app/platform/mobile/**'));
    src.push('!' + join(path, 'app/main.ts'));
  }
  //console.log("===================",src);
  return src;
}
