import * as gulp from 'gulp';
import Config from '../../config';

export = () => {
return gulp.src('node_modules/primeui/themes/' + Config.PRIMEUI_THEME + '/images/**').pipe(gulp.dest(Config.CSS_DEST +'/images'))
       && gulp.src('node_modules/primeui/themes/' + Config.PRIMEUI_THEME + '/fonts/**').pipe(gulp.dest(Config.CSS_DEST + '/fonts'));
};
