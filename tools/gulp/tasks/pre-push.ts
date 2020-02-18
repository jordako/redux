import * as util from 'gulp-util';
import * as gulp from 'gulp';
import * as fs from 'fs';

/**
 * Generate the pre-push file
 */
async function generatePrePushFile() {
  util.log(util.colors.blue('Copying pre-push file to hooks...'));
  const prePushFileName = 'pre-push';
  const prePushToolFile = './tools/pre-push/' + prePushFileName;
  const prePushHookRoute = './.git/hooks/';
  if (!fs.existsSync(prePushHookRoute)) {
    try {
      fs.mkdirSync(prePushHookRoute);
    } catch (e) {
      util.log(util.colors.yellow('PRE-PUSH NOT INSTALLED, error on mkdirSync'));
      return;
    }
    util.log(util.colors.yellow('Created hook folder'));
  }
  try {
    fs.createReadStream(prePushToolFile).pipe(
      fs.createWriteStream(prePushHookRoute + prePushFileName),
    );
    fs.chmodSync(prePushHookRoute + prePushFileName, '777');
    util.log(util.colors.yellow('Pre-push file generated'));
  } catch (e) {
    util.log(util.colors.red('ERROR on create pre-push file'));
  }
}

gulp.task('generate.pre-push', generatePrePushFile);
