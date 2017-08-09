var gulp = require('gulp');
var del = require('del');
var ghPages = require('gulp-gh-pages');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');


gulp.task('clean', () => {
    return del('build/*');
});

// usemin task to read html file
gulp.task('build', ['clean', 'img', 'root'], () => {
    return gulp.src('./index.html')
    .pipe(usemin({
        jsAttributes : {
            async : true
        },
        js: [uglify(), rev()],
        js1: [uglify(), rev()],
        css: [sass(), 'concat', rev()]
    }))
    .pipe(gulp.dest('./build/'));
    
});

gulp.task('img', ['clean'], () => {
    return gulp.src('./img/**/*')
    .pipe(gulp.dest('./build/img'));
});

gulp.task('root', ['clean'], () => {
    return gulp.src('./root/**/*')
        .pipe(gulp.dest('./build/'));    
})

gulp.task('publish', ['build'], () => {
    return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('serve', ['build'], function() {
    gulp.src('build')
    .pipe(webserver({
        livereload: true,
        open: true,
        port: 3000
    }));
    
    gulp.watch(['./index.html', './js/*.js', './scss/*.scss'], ['build'], (event) => {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    })
    
});
