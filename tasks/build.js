// Builds from src to dist or from dist to build
'use strict'
module.exports = function(gulp, config, plugins){




	// Compress for development to dist
	gulp.task('dist', function(cb){
		// Clear cache
		cached.caches = {}

		// Build everything
		runSequence(
			'undist',
			['html', 'style', 'script'],
			//'manifest',
			cb
		)
	})


	// Compress for production to dist
	gulp.task('stage', function(cb){
		runSequence(
			'undist',
			['htmlprod', 'styleprod', 'scriptprod'],
			//'manifest',
			cb
		)
	})


	// Compress everything but HTML for production to dist
	gulp.task('stagesome', function(cb){
		runSequence(
			'undist',
			['html', 'styleprod', 'scriptprod'],
			//'manifest',
			cb
		)
	})



	gulp.task('build', function(cb){
		runSequence(
			['stage', 'unbuild'],
			'copybuild',
			cb
		)
	})



	// Copy to build
	gulp.task('copybuild', function(){
		return gulp.src(config.dist + '/**/*')
			.pipe(gulp.dest(config.build))
	})



	// Cleaners
	gulp.task('undist', function(){
		return gulp.src(config.dist)
			.pipe(vinylPaths(del))
	})
	gulp.task('unbuild', function(){
		return gulp.src(config.build)
			.pipe(vinylPaths(del))
	})










}