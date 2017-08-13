var gulp = require('gulp');

// Copy all HTML files
gulp.task('copyHtml', function(){
   gulp.src('src/*.html')
       .pipe(gulp.dest('dist'));
    gulp.src('src/view/*.html')
        .pipe(gulp.dest('dist/view'));
});

// Copy all image files
gulp.task('copyImage', function(){
    gulp.src('src/Images/*')
        .pipe(gulp.dest('dist/Images'));
    gulp.src('src/Images/Icons/*')
        .pipe(gulp.dest('dist/Images/Icons'));
});

// Copy JS
gulp.task('copyJs', function(){
    gulp.src('src/scripts/*.js')
        .pipe(gulp.dest('dist/scripts'));
   gulp.src('src/scripts/controllers/*.js')
       .pipe(gulp.dest('dist/scripts/controllers'));
    gulp.src('src/scripts/directives/*.js')
        .pipe(gulp.dest('dist/scripts/directives'));
    gulp.src('src/scripts/services/*.js')
        .pipe(gulp.dest('dist/scripts/services'));
});

// Copy CSS
gulp.task('copyCss', function(){
   gulp.src('src/styles/*.css')
       .pipe(gulp.dest('dist/styles'));
});

// Copy fonts
gulp.task('copyFont', function(){
   gulp.src('src/fonts/*')
       .pipe(gulp.dest('dist/fonts'));
});

gulp.task('default', ['copyHtml', 'copyImage', 'copyJs', 'copyCss', 'copyFont']);

gulp.task('watch', function(){
    gulp.watch('src/view/*.html', ['copyHtml']);
    gulp.watch('src/*.html', ['copyHtml']);
    gulp.watch('src/scripts/**/*.js', ['copyJs']);
    gulp.watch('src/styles/*.css', ['copyCss']);
    gulp.watch('src/fonts/*', ['copyFont']);
});