var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    minifycss = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    sass = require('gulp-ruby-sass'),
    livereload = require('gulp-livereload'),
    del = require('del');

/**
 * Functions to build files
 */

function buildScript() 
{
  var path = "static/js/*.js",  // Path to scripts
    dist = "static/dist/js";  // Destiny

  // Building script
  return gulp.src(path)  // Defning source of js scripts
    .pipe(concat("scripts.js"))  // Concating all scripts from path
    .pipe(rename({suffix: '.min'}))  // Renaming scripts.js
    .pipe(uglify())  // Uglifying scripts.min.js
    .pipe(gulp.dest(dist))  // Destiny of scripts.min.js
    .pipe(notify({ message: "Scripts task complete" }));  // Notify when done
}

function buildCSS() 
{
    var path = "static/sass/base.sass",
        dist = "static/dist/css";

    // Building minified file
    return sass(path, { style: "expanded" })  // Compiling SASS
      .pipe(gulp.dest(dist))  // Destiny of styles.css
      .pipe(rename({suffix: '.min'}))  // Appending .min
      .pipe(minifycss())  // Minifying style
      .pipe(gulp.dest(dist))  // Destiny of styles.min.css
      .pipe(notify({ message: "Styles task complete" }));  // Notify when done
}

/**
 * Defining gulp tasks
 */

// Clean up dist folders
gulp.task("clean", function(cb) {
    del(["assets/dist/css", "assets/dist/js"], cb)
});

// Compiling js files
gulp.task("scripts", function() { return buildScript(); });

// Compiling SASS files (styles)
gulp.task("styles", function() { return buildCSS(); });

// Default task: clean dist folders and build scripts
// Task "clean" is a dependency, which means that must
// execute first in order the task execute its content
gulp.task("default", ["clean"], function() {
    gulp.start("styles", "scripts");
});

/**
 * Watch
 */

gulp.task("watch-all", function() {

    // Watch .sass files
    // The watch method will check if some file has changed.
    // If yes, will execute the further tasks. It work as 
    // trigger
    gulp.watch("static/sass/**/*.sass", ["styles"]);

    // Watch .js files
    gulp.watch("static/js/**/*.js", ["scripts"]);

    // Livereload to be used with the livereload chrome extension 
    // or a livereload middleware. The Livereload extension will inject
    // the changes on the fly without need to refresh the page
    livereload.listen();

    // If some dist file is available, 
    // we call livereload to inject the changes in our page
    gulp.watch(["static/dist/**/*"]).on("change", livereload.changed);
});