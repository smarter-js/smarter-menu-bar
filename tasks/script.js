// Preprocesses JavaScript for development and production
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



	gulp.task('script', function(){

		let full = browserify(config.src + '/' + config.script + '/' + config.package.name + '.js', {
				debug: true
			})
			.transform(babelify, {
				//sourceMapsAbsolute: true,
				presets: ['es2015', 'react'],
				sourceMaps: true,
				//auxiliaryCommentBefore: config.info + '\n'
			})
			//.transform(debowerify)
			.bundle()
			.pipe(source(config.package.name + '.js'))
			.pipe(buffer())
			// Standard Gulp pipe here
			.pipe(plumber(onError))
			.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(wrapJs(config.info + '\n;%= body %'))
			.pipe(sourcemaps.write('./'))


		let min = browserify(config.src + '/' + config.script + '/' + config.package.name + '.js')
			.transform(babelify, {
				//sourceMapsAbsolute: true,
				presets: ['es2015', 'react'],
				//auxiliaryCommentBefore: config.info + '\n'
			})
			//.transform(debowerify)
			.bundle()
			.pipe(source(config.package.name + '.js'))
			.pipe(buffer())
			// Standard Gulp pipe here
			.pipe(plumber(onError))
			.pipe(wrapJs(config.info + '\n;%= body %'))
			.pipe(uglify({
				preserveComments:'some'
			}))
			.pipe(stripDebug())
			.pipe(rename(function(path){
				path.basename += '.min'
			}))


		return merge(full, min)
			.pipe(gulp.dest(config.dist))
			.pipe(notify({
				message: 'JavaScript processed',
				onLast: true
			}))
	})




}