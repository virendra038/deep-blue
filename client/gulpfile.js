/**
 * @author  Rahul
 */
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var wiredep = require('wiredep').stream;
var config = require('./gulpfile-config');
var browserSync = require('browser-sync');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
var $ = require('gulp-load-plugins')({lazy: true});
//Del plugin
var del = require('del')

//gulp.task('default',['watch']);

gulp.task('minification', function () {
    gulp.src('app/modules/home/homeController.js').pipe(uglify()).pipe(gulp.dest('app'));
});

gulp.task('sasscompilation', function () {
    gulp.src('assets/css/style.scss').pipe(sass()).pipe(gulp.dest('assets/css/breakpoints/new'));
});


// wiredep task to inject bower components automatically in index.html
gulp.task('wiredep', function () {
    var options = config.getWiredepDefaultOptions();
    return gulp.src(config.index)
        .pipe(wiredep(options))
        .pipe(gulp.dest('./'));
});

//injecting new customjs files in index.html

gulp.task('inject', function () {
    return gulp.src(config.index)
        .pipe(inject(gulp.src(config.alljs)))
        .pipe(gulp.dest('./'));
});

//creating main.css file from all the scss files

gulp.task('sass', function () {
    return gulp.src(config.scss)
        .pipe(sass({outputStyle: 'extended'}).on('error', sass.logError))
        .pipe(concat('base.css'))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('watch-css', function () {
    return gulp.src('assets/css/base.css')
        .pipe(browserSync.stream());
});


// browser-sync task to run the project on server and keep track of the files

gulp.task('browser-sync', ['nodemon'], function () {
    browserSync.init(null, {
        proxy: "http://localhost:9000",
        port: 7000,
    });


    gulp.watch(config.allhtml).on('change', browserSync.reload);
    gulp.watch(config.alljs).on('change', browserSync.reload);
    gulp.watch(config.allscss, ['sass']);
    gulp.watch('assets/css/base.css', ['watch-css']);


});




gulp.task('nodemon', function (cb) {
    var started = false;
    return nodemon({
        script: '../server/app.js',
        watch: config.allServerjs,
    }).on('start', function () {
        if (!started) {
            cb();
            started = true;
        }

    }).on('restart', function () {
    });
});


gulp.task('default', ['sass', 'browser-sync'], function () {
});


gulp.task('clean-code', function (done) {

    var files = [].concat(
        config.temp + '**/*.js',
        config.build + '**/*.html',
        config.build + 'js/**/*.js'
    );
    return clean(files, done);

});

//Template cache for angular templates
gulp.task('templatecache', ['clean-code'], function () {
    log('Creating angular js template cache');
    return gulp.src(config.htmltemplates)
        .pipe($.minifyHtml({empty: true}))
        .pipe($.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options))
        .pipe(gulp.dest(config.temp));
});


//Optimize task for the build pipeline

gulp.task('optimize', ['inject', 'templatecache'], function () {
    log('Optimizing the javascript, css and html');

    var assets = $.useref.assets({searchPath: './'});
    var templateCache = config.temp + config.templateCache.file;
    var cssFilter = $.filter('**/*.css', {restore: true});
    var jsLibFilter = $.filter('**/lib.js', {restore: true});
    var jsAppFilter = $.filter('**/app.js', {restore: true});
    return gulp.src(config.index)
        .pipe($.plumber())
        .pipe($.inject(gulp.src(templateCache,
            {read: false}),
            {starttag: '<!-- inject:template:js -->'}))
        .pipe(assets)
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore)
        .pipe(jsLibFilter)
        .pipe($.uglify())
        .pipe(jsLibFilter.restore)
        .pipe(jsAppFilter)
        .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe($.stripDebug())
        .pipe(jsAppFilter.restore)
        .pipe($.rev()) //rename the file
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace())
        .pipe(gulp.dest(config.build))
        .pipe($.rev.manifest())
        .pipe(gulp.dest(config.build));

});

//Function to log messages for each task
function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    }
    else {
        $.util.log($.util.colors.blue(msg));
    }
}


//Clean function
function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    return del(path, done);
}

//gulp.task('watch',function(){
//   gulp.watch('app/modules/home/homeController.js',['minification']);
//});


//gulp.task('watch', function() {
//    gulp.watch('source/javascript/**/*.js', ['jshint']);
//    gulp.watch('source/scss/**/*.scss', ['build-css']);
//});


