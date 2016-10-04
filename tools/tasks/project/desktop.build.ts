import Config from '../../config';
import * as gulp from 'gulp';
import { join } from 'path';


export = () => {
	let src = [
		join(Config.APP_SRC, 'package.json')
		//, join(config.APP_SRC, 'start.desktop.js')
	];
	console.log(Config.APP_DEST);
	return gulp.src(src)
		.pipe(gulp.dest(Config.APP_DEST));
};
