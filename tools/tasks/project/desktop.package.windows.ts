import Config from '../../config';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';

const plugins = <any>gulpLoadPlugins();
var electron = require('gulp-atom-electron');
var vfs = require('vinyl-fs');

export = () => {
	let src = [
		join(Config.APP_DEST, '/**')
	];

	return vfs.src(src, { base: Config.APP_DEST, followSymlinks: false })
		.pipe(electron({ version: '1.4.0', platform: 'win32', winIcon: 'src/client/assets/favicon.ico' }))
		.pipe(plugins.symdest(join(Config.BUILD_DEST)));

};
