import * as gulp from 'gulp';
import * as runSequence from 'run-sequence';
import Config from '../../config';

const electron = require('electron-connect').server.create({ 'path': Config.DEV_DEST });

export = () => {
  electron.start();
  gulp.watch(['./src/**/*'], reload);
};

function reload() {
 runSequence('desktop', electron.reload);
}
