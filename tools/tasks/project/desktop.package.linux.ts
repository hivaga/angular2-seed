import Config from '../../config';
import * as gulp from 'gulp';
import { join } from 'path';

var symdest = require('gulp-symdest');
var electron = require('gulp-atom-electron');

export = () => {
  let src = [
	  Config.APP_DEST + '/**/*'
  ];
  return gulp.src(src, { base: Config.APP_DEST })
    .pipe(electron({ version: '1.4.0', platform: 'linux' }))
  	.pipe(symdest(join(Config.APP_DEST)));
    //.pipe(symdest(join('desktop/linux', Config.ENV)));
};
