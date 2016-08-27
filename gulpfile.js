// Load options
let config = require('./config.js')

// Load plugins
const gulp = require('gulp')
	, gulpLoadPlugins = require('gulp-load-plugins')
	, plugins = gulpLoadPlugins({
		pattern: ['*']
	})

plugins.fs = require('fs')
plugins.opn = require('opn')
plugins.babelify = require('babelify')
plugins.childProcess = require('child_process')
plugins.gulpif = plugins.if
plugins.merge = require('event-stream').merge
plugins.glob = require('glob-all')
plugins.debowerify = require('debowerify')
plugins.browserSync = require('browser-sync').create()
plugins.runSequence = require('run-sequence')
plugins.del = require('del')
plugins.vinylPaths = require('vinyl-paths')
plugins.source = require('vinyl-source-stream')
plugins.buffer = require('vinyl-buffer')
plugins.notifier = require('node-notify')
for(let i in plugins){
	global[i] = plugins[i]
}

// Load tasks
let files = glob.sync('./tasks/*.js')
for(let i = 0; i < files.length; i++){
	require(files[i])(gulp, config, plugins)
}

// Test for errors
gulp.task('test', function(cb){
	cb()
})

















