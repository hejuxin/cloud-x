const gulp = require('gulp');
const path = require('path');
const rimraf = require('rimraf');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');

const merge = require('merge2');

const { compilerOptions } = require('./tsconfig.json');

const tsConfig = {
  noUnusedParameters: true,
  noUnusedLocals: true,
  strictNullChecks: true,
  target: 'es6',
  jsx: 'preserve',
  moduleResolution: 'node',
  declaration: true,
  allowSyntheticDefaultImports: true,
  ...compilerOptions,
};

const babelConfig = require('./babel.config.json');

const source = [
  'components/**/*.{js,ts,jsx,tsx}',
  '!components/**/*.stories.{js,ts,jsx,tsx}',
];

const base = path.join(process.cwd(), 'components');
function getProjectPath(filePath) {
  return path.join(process.cwd(), filePath);
}
const libDir = getProjectPath('lib');
const esDir = getProjectPath('es');


gulp.task('compile-with-es', (done) => {
  console.log('Compile to es...');
  compile(false).on('finish', done);
});

gulp.task('compile-with-lib', (done) => {
  console.log('Compile to js...');
  compile().on('finish', done);
});

gulp.task('compile', gulp.parallel('compile-with-es', 'compile-with-lib'));

function compile(modules) {
  const targetDir = modules === false ? esDir : libDir;
  rimraf.sync(targetDir);
  const { js, dts } = gulp.src(source, { base }).pipe(ts(tsConfig));
  const dtsFilesStream = dts.pipe(gulp.dest(targetDir));
  let jsFilesStream = js;
  if (modules) {
    jsFilesStream = js.pipe(babel(babelConfig));
  }
  jsFilesStream = jsFilesStream.pipe(gulp.dest(targetDir));

  return merge([jsFilesStream, dtsFilesStream]);
}
