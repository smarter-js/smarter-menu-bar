// Preprocesses Pug for development and production
'use strict'
module.exports = function(gulp, config, plugins){

	// Error handling
	let onError = {
		errorHandler: function(err) {
			util.log(util.colors.red(err))
			this.emit('end')
			notifier({
				message: 'ERROR!!!',
				onLast: true
			})
		}
	}


	// Clear demo folder
	gulp.task('demo:clean', function(){
		return gulp.src(config.demo)
			.pipe(vinylPaths(del))
	})

	// Transpile Pug
	gulp.task('demo:html', function(){

		return gulp.src([
				config.src + '/' + config.demo + '/**/*.pug',
				'!' + config.src + '/' + config.demo + '/**/_*.pug',
			])
			.pipe(plumber(onError))
			.pipe(pug({
				pretty: '\t'
			}))
			.pipe(gulp.dest(config.demo))
			.pipe(notify({
				message: 'Demo Pug processed',
				onLast: true
			}))

	})

	// Transpile JavaScript
	gulp.task('demo:script', function(cb){


		return gulp.src(config.src + '/' + config.demo + '/**/*.js')
			.pipe(plumber(onError))
			.pipe(babel({
					presets: ['es2015', 'react'],
					sourceMaps: true,
			}))
			// Standard Gulp pipe here
			.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(config.demo))
			.pipe(notify({
				message: 'Demo JavaScript processed',
				onLast: true
			}))

	})

	// Transpile Sass
	gulp.task('demo:style', function(){

		return gulp.src(config.src + '/' + config.demo + '/**/*.{scss,css}')
			.pipe(plumber(onError))
			.pipe(sourcemaps.init())
			.pipe(sass({
				indentType: 'tab',
				outputStyle: 'expanded',
				indentWidth: 1
			}))
			.pipe(autoprefixer())
			.pipe(sourcemaps.write('/'))
			.pipe(gulp.dest(config.demo))
			.pipe(plugins.browserSync.stream())
			.pipe(notify({
				message: 'Demo Sass processed',
				onLast: true
			}))

	})

	// Build complete demo folder
	gulp.task('demo:build', ['demo:script', 'demo:style', 'demo:html'])

	// Clean, then build complete demo folder
	gulp.task('demo', function(){
		return runSequence('demo:clean', ['demo:build'])
	})


}