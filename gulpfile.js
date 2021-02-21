'use strict';

let gulp = require('gulp'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglifyjs'),
	rigger = require('gulp-rigger'),
    fileinclude = require('gulp-file-include'),
	cssnano = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('gulp-pngquant'),
	runSequence = require('run-sequence'),
	cache = require('gulp-cache'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	del = require('del');

gulp.task('html', function () {
	return gulp.src('src/[^_]*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
		.pipe(gulp.dest('dist/'))
		.pipe(reload({stream: true}));
});

gulp.task('fileinclude', function () {
    return gulp.src('app/html-dev/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('app/html-view'));
});

gulp.task('sass', function() {
	return gulp.src('src/scss/main.scss')
		.pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(gulp.dest('dist/css'))
		.pipe(reload({stream: true}));
});

gulp.task('sass-libs', function () {
	return gulp.src('src/scss/libs.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/css'))
		.pipe(reload({stream: true}));
});

gulp.task('script-main', function () {
	return gulp.src([
		'src/js/main.js'
	])
		.pipe(gulp.dest('dist/js'))
		.pipe(reload({stream: true}));
});

gulp.task('script-libs', function () {
	return gulp.src([
		'src/js/libs.js'
	])
		.pipe(rigger())
		.pipe(uglify())
        .pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('font', function () {
	return gulp.src([
		'src/fonts/**/*'
	])
		.pipe(gulp.dest('dist/fonts'))
        .pipe(reload({stream: true}));
});

gulp.task('libs', function () {
    return gulp.src([
        'src/libs/**/*'
    ])
        .pipe(gulp.dest('dist/libs'))
        .pipe(reload({stream: true}));
});

gulp.task('img', function () {
    return gulp.src('src/img/**/*')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'dist'
		},
		notify: false
	});
});

gulp.task('clean-dist', function () {
    return del.sync('dist');
});

gulp.task('clean-build', function () {
    return del.sync('build');
});

gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('watch', ['clean-dist', 'sass-libs', 'sass', 'script-libs', 'script-main', 'libs', 'font', 'img', 'html', 'browser-sync'], function() {

    gulp.watch('src/scss/libs.scss', ['sass-libs']);

    gulp.watch('src/scss/partials/**/*.scss', ['sass']);

    gulp.watch('src/scss/main.scss', ['sass']);

    gulp.watch('src/js/libs.js', ['script-libs']);

    gulp.watch('src/js/main.js', ['script-main']);

    gulp.watch('src/libs/**/*', ['libs']);

    gulp.watch('src/fonts/**/*', ['font']);

    gulp.watch('src/img/**/*', ['img']);

    gulp.watch('src/*.html', ['html']);

});

gulp.task('build', ['clean-build'], function() {
	gulp.src('dist/css/*.css')
		.pipe(gulp.dest('build/css'));

	gulp.src('dist/fonts/**/*')
		.pipe(gulp.dest('build/fonts'));

    gulp.src('dist/libs/**/*')
        .pipe(gulp.dest('build/libs'));

	gulp.src('dist/js/*.js')
		.pipe(gulp.dest('build/js'));

	gulp.src('dist/*.html')
		.pipe(gulp.dest('build'));

	gulp.src('dist/img/**/*')
		.pipe(gulp.dest('build/img'));
});

gulp.task('default', ['watch']);