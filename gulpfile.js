const gulp = require('gulp');

const tslint = require('gulp-tslint');
const typescript = require('gulp-typescript');
const sourcemap = require('gulp-sourcemaps');
const del = require('del');
const mocha = require('gulp-mocha');

const DEST = 'server';

gulp.task('tslint', () => {
    return gulp
        .src([
            'src/**/*.ts'
        ])
        .pipe(tslint({
            formatter: 'verbose'
        }))
        .pipe(tslint.report({
            summarizeFailureOutput: true
        }));
});

gulp.task('clean', ['tslint'], () => {
    del.sync([DEST]);
});

gulp.task('tsc', ['clean'], () => {
    const tsProject = typescript.createProject('tsconfig.json', () => {
        typescript: require('typescript')
    });

    return gulp
        .src([
            'src/**/*.ts'
        ])
        .pipe(sourcemap.init())
        .pipe(tsProject())
        .js
        .pipe(sourcemap.write('./'))
        .pipe(gulp.dest(DEST));
});

gulp.task('build', ['tsc']);

gulp.task('test', ['build'], () => {
    gulp.src([
        'test/**/*.js'
    ])
    .pipe(mocha({
        reporter: 'spec',
        timeout: 5000
    }));
});

gulp.task('watch', () => {
    gulp.watch('src/**/*.ts', ['build']);
});

gulp.task('default', ['build']);