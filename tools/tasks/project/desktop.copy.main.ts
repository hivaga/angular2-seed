import Config from '../../config';
import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';
 

const plugins = <any>gulpLoadPlugins();

/**
 * Copy start.desktop to the `dist/dev` directory.
 */
export = () => {
  return gulp.src([
      join(Config.TMP_DIR, 'start.desktop.js'),
    ])
	.pipe(plugins.uglify())
	.pipe(gulp.dest(Config.APP_DEST));
};
