// Preprocesses Sass for development and production
'use strict'
module.exports = function(gulp, config, plugins){

	let onError = {
		errorHandler: function(err) {
			util.log(util.colors.red(err))
			this.emit('end')
			gulp.src('')
				.pipe(notify({message: 'ERROR!!!', onLast: true}))
			
		}
	}


	gulp.task('style:build', function(){

		let full = gulp.src(config.src + '/' + config.style + '/' + config.package.name + '.scss')
			.pipe(plumber(onError))
			.pipe(sourcemaps.init())
			.pipe(sass({
				indentType: 'tab',
				outputStyle: 'expanded',
				indentWidth: 1
			}))
			.pipe(autoprefixer({
				browsers: config.browsers
			}))
			.pipe(sourcemaps.write('/'))
			.pipe(gulp.dest(config.dist))

		let min = gulp.src(config.src + '/' + config.style + '/' + config.package.name + '.scss')
			.pipe(plumber(onError))
			.pipe(sass({
				outputStyle: 'compressed'
			}))
			.pipe(autoprefixer({
				browsers: config.browsers
			}))
			.pipe(csso())
			.pipe(rename(function(path){
				path.basename += '.min'
			}))
			.pipe(gulp.dest(config.dist))

		return merge(full, min)
			.pipe(plugins.browserSync.stream())
			.pipe(notify({
				message: 'Library styles processed',
				onLast: true
			}))

	})
	// Prepend info to dist files
	gulp.task('style:info', function(){
		let info = JSON.parse(fs.readFileSync('./package.json'))
		return gulp.src(config.src + '/' + config.style + '/info.scss')
			.pipe(insert.transform(function(contents, file){
				let author
				author = info.author.url ? info.author.url : info.author
				return config.info + '\n'
			}))
			.pipe(gulp.dest(config.src + '/' + config.style))
	})

	gulp.task('style', function(cb){
		runSequence('style:info', ['style:build'], cb)
	})


}