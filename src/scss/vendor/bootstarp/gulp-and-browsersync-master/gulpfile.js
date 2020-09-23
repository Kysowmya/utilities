var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify-es').default;
//var print = require('gulp-print');

gulp.task('scripts', function() {
return gulp.src(
/* Add your JS files here, they will be combined in this order */
'node_modules/jquery/dist/jquery.js',
'node_modules/popper.js/dist/umd/popper.js',
'node_modules/bootstrap/js/dist/util.js',
'node_modules/bootstrap/js/dist/alert.js',
//'node_modules/push.js/bin/push.js',
'node_modules/bootstrap/js/dist/button.js',
'node_modules/bootstrap/js/dist/dropdown.js',
'node_modules/bootstrap/js/dist/tab.js',
'node_modules/bootstrap/js/dist/carousel.js',
'node_modules/bootstrap/js/dist/collapse.js',
'node_modules/bootstrap/js/dist/modal.js',
'node_modules/bootstrap/js/dist/scrollspy.js',
'node_modules/bootstrap/js/dist/tooltip.js',
'node_modules/bootstrap/js/dist/popover.js',
'node_modules/bootstrap/js/dist/toast.js',
'src/js/main.js',
'src/js/other.js'
)
.pipe(concat('scripts.js'))
.pipe(gulp.dest('js'))
.pipe(rename({suffix: '.min'}))
.pipe(uglify())
.pipe(gulp.dest('./js'));
});


// gulp.task('message', function() {
//   return gulp.src('package.json')
//     .pipe(print(function() { return 'HTTP Server Started'; }));
// });
// gulp.task('message', function() {
//   return new Promise(function(resolve, reject) {
//     console.log("HTTP Server Started");
//     resolve();
//   });
// });

gulp.task('include', async function () {   //<-- async added
    gulp.src('./../pay-dialog.js')
        .pipe(include()) // <-- from gulp-include, witch is async, similar to del
        .on(1,'error', console.log())
        .pipe(gulp.dest('../js/'));

      });
gulp.task('sass', function () {
gulp.src('src/scss/main.scss')
.pipe(sass({includePaths: 'scss'}))
.pipe(gulp.dest('./css'))
.pipe(minifycss());
});
gulp.task('browser-sync', function() {
browserSync.init("css/.css", "js/.js", {
server: {
baseDir: "./"
}
});
});
gulp.task('html', gulp.series('browser-sync', 'include', 'sass'), function () {
gulp.src('./.html')
.pipe(gulp.dest('./'));
});
// gulp.task('browser-sync', function() {
// browserSync.init("css/.css", "js/.js", {
// server: {
// baseDir: "./"
// }
// });
// });
function defaultTask(cb) {
gulp.task('default', gulp.series('sass', 'browser-sync','include'), function () {
gulp.watch("src/scss/**/.scss", 'sass').on("change", reload);
gulp.watch("./.html", 'html').on("change", reload);
gulp.watch("src/js/.js", 'scripts').on("change", reload);
});
cb();
}

exports.default = defaultTask
