import { clean } from '../../utils';
import Config from '../../config';

/**
 * Executes the build process, cleaning all files within the `/dist/dev` directory.
 */
console.log(Config.APP_DEST);
export =  clean([Config.APP_DEST, Config.APP_DEST, Config.TMP_DIR]);
