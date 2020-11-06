"use strict";

const gulp = require("gulp");
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");
const del = require("del");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');

// const dist = "/Applications/MAMP/htdocs/Portfolio"; // Ссылка на вашу папку на локальном сервере
const dist = "./dist";

gulp.task("copy-html", () => {
	return gulp.src("./src/index.html")
		.pipe(gulp.dest(dist))
		.pipe(browsersync.stream());
});

gulp.task("copy-libs", () => {
	return gulp.src("./src/sass/libs/**/*.css")
		.pipe(gulp.dest(dist + '/libs'))
		.pipe(browsersync.stream());
});

gulp.task("build-sass", () => {
	return gulp.src("./src/sass/style.scss")
		.pipe(sass().on('error', sass.logError))
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["last 5 versions"],
				cascade: true
			})
		)
		.pipe(gulp.dest(dist))
		.pipe(browsersync.stream());
});

gulp.task('images', function () {
	return gulp.src("src/img/**/*")
		.pipe(
			imagemin({
				progressive: true,
				svgoPlugins: [{
					removeViewBox: false
				}],
				interlaced: true,
				optimixationLevel: 3 // 0 to 7
			})
		)
		.pipe(gulp.dest(dist + "/img"));
});

gulp.task('copy-php', function () {
	return gulp.src("src/db.json")
		.pipe(gulp.dest(dist));
});

gulp.task('clear', function () {
	return del(dist + "/");
});

gulp.task("build-js", () => {
	return gulp.src("./src/js/main.js")
		.pipe(webpack({
			mode: 'development',
			output: {
				filename: 'script.js'
			},
			watch: false,
			devtool: "source-map",
			module: {
				rules: [
					{
						test: /\.m?js$/,
						exclude: /(node_modules|bower_components)/,
						use: {
							loader: 'babel-loader',
							options: {
								presets: [['@babel/preset-env', {
									debug: true,
									corejs: 3,
									useBuiltIns: "usage"
								}]]
							}
						}
					}
				]
			}
		}))
		.pipe(gulp.dest(dist))
		.on("end", browsersync.reload);
});

gulp.task("watch", () => {
	browsersync.init({
		server: "./dist/",
		port: 4000,
		notify: true
	});

	gulp.watch("./src/index.html", gulp.parallel("copy-html"));
	gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
	gulp.watch("./src/sass/**/*.scss", gulp.parallel("build-sass"));
	gulp.watch("./src/img/**/*", gulp.parallel("images"));
	gulp.watch("./src/php/**/*.php", gulp.parallel("copy-php"));
	gulp.watch("./src/sass/**/*.php", gulp.parallel("copy-libs"));
});

gulp.task("build", gulp.parallel("copy-html", "build-js", "build-sass", "images", "copy-php", 'copy-libs'));
// gulp.task("build", gulp.series('clear', gulp.parallel("copy-html", "build-js", "build-sass", "images", "copy-php")));


gulp.task("prod", () => {
	gulp.src("./src/sass/style.scss")
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(autoprefixer({ overrideBrowserslist: ["last 5 versions"], cascade: true }))
		.pipe(gulp.dest(dist));
	return gulp.src("./src/js/main.js")
		.pipe(webpack({
			mode: 'production',
			output: {
				filename: 'script.js'
			},
			module: {
				rules: [
					{
						test: /\.m?js$/,
						exclude: /(node_modules|bower_components)/,
						use: {
							loader: 'babel-loader',
							options: {
								presets: [['@babel/preset-env', {
									corejs: 3,
									useBuiltIns: "usage"
								}]]
							}
						}
					}
				]
			}
		}))
		.pipe(gulp.dest(dist));
});

gulp.task("default", gulp.parallel("watch", "build"));